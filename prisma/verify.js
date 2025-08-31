const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { promisify } = require('util');

async function verifyDatabase() {
  try {
    console.log('🔍 Verifying database setup...\n');

    const dbPath = path.join(__dirname, 'dev.db');
    const db = new sqlite3.Database(dbPath);

    const dbAll = promisify(db.all.bind(db));

    // Check users
    const users = await dbAll('SELECT * FROM auth_users ORDER BY name');
    console.log('👥 Users:');
    users.forEach(user => {
      console.log(`  - ${user.name} (${user.email}) - Role: ${user.role}`);
    });

    // Check teacher profiles
    const teachers = await dbAll(`
      SELECT tp.*, u.name, u.email 
      FROM lms_teacher_profiles tp 
      JOIN auth_users u ON tp.userId = u.id 
      ORDER BY u.name
    `);
    console.log('\n👩‍🏫 Teacher Profiles:');
    teachers.forEach(teacher => {
      console.log(`  - ${teacher.name} (${teacher.gender})`);
      console.log(`    Bio: ${teacher.bio.substring(0, 60)}...`);
      console.log(`    Languages: ${teacher.languages}`);
      console.log(`    Certifications: ${teacher.certifications.substring(0, 50)}...`);
      console.log('');
    });

    // Check leads
    const leads = await dbAll('SELECT * FROM crm_leads ORDER BY name');
    console.log('🎯 CRM Leads:');
    leads.forEach(lead => {
      console.log(`  - ${lead.name} (${lead.email}) - Status: ${lead.status}`);
    });

    // Check events
    const events = await dbAll('SELECT * FROM analytics_events ORDER BY timestamp DESC LIMIT 5');
    console.log('\n📊 Recent Analytics Events:');
    events.forEach(event => {
      console.log(`  - ${event.name} at ${event.timestamp}`);
      if (event.properties) {
        console.log(`    Properties: ${event.properties}`);
      }
    });

    // Check message logs
    const messages = await dbAll('SELECT * FROM comms_message_logs ORDER BY sentAt DESC LIMIT 5');
    console.log('\n📨 Recent Message Logs:');
    messages.forEach(message => {
      console.log(`  - ${message.template} to ${message.to} via ${message.channel} - Status: ${message.status}`);
    });

    // Count records by schema/namespace
    console.log('\n📈 Database Summary:');
    const authCount = await dbAll('SELECT COUNT(*) as count FROM auth_users');
    const crmCount = await dbAll('SELECT COUNT(*) as count FROM crm_leads');
    const lmsTeacherCount = await dbAll('SELECT COUNT(*) as count FROM lms_teacher_profiles');
    const lmsStudentCount = await dbAll('SELECT COUNT(*) as count FROM lms_student_profiles');
    const billingCount = await dbAll('SELECT COUNT(*) as count FROM billing_invoices');
    const commsCount = await dbAll('SELECT COUNT(*) as count FROM comms_message_logs');
    const analyticsCount = await dbAll('SELECT COUNT(*) as count FROM analytics_events');

    console.log(`  Auth namespace: ${authCount[0].count} users`);
    console.log(`  CRM namespace: ${crmCount[0].count} leads`);
    console.log(`  LMS namespace: ${lmsTeacherCount[0].count} teacher profiles, ${lmsStudentCount[0].count} student profiles`);
    console.log(`  Billing namespace: ${billingCount[0].count} invoices`);
    console.log(`  Communications namespace: ${commsCount[0].count} message logs`);
    console.log(`  Analytics namespace: ${analyticsCount[0].count} events`);

    db.close();
    console.log('\n✅ Database verification completed successfully!');

  } catch (error) {
    console.error('❌ Error verifying database:', error);
    throw error;
  }
}

verifyDatabase()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });