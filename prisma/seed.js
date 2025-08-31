const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');
const { promisify } = require('util');

async function main() {
  try {
    console.log('🌱 Starting database seeding...');

    const dbPath = path.join(__dirname, 'dev.db');
    const db = new sqlite3.Database(dbPath);

    // Promisify database methods
    const dbRun = promisify(db.run.bind(db));
    const dbGet = promisify(db.get.bind(db));

    // Hash password for all users
    const hashedPassword = await bcrypt.hash('defaultPassword123', 10);

    // Generate IDs
    const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

    // Create Female Teacher
    const femaleTeacherId = generateId();
    const femaleTeacherProfileId = generateId();

    await dbRun(`
      INSERT INTO auth_users (id, role, name, email, hashedPassword, createdAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [femaleTeacherId, 'teacher', 'Sarah Johnson', 'sarah.johnson@example.com', hashedPassword, new Date().toISOString()]);

    await dbRun(`
      INSERT INTO lms_teacher_profiles (id, userId, bio, languages, gender, certifications)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      femaleTeacherProfileId,
      femaleTeacherId,
      'Experienced mathematics teacher with 8 years of teaching experience. Passionate about making complex concepts accessible to all students.',
      'English, Spanish',
      'female',
      'M.Ed Mathematics, Certified Secondary Mathematics Teacher, Google Certified Educator'
    ]);

    console.log('✅ Created female teacher: Sarah Johnson');

    // Create First Male Teacher
    const maleTeacher1Id = generateId();
    const maleTeacher1ProfileId = generateId();

    await dbRun(`
      INSERT INTO auth_users (id, role, name, email, hashedPassword, createdAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [maleTeacher1Id, 'teacher', 'Michael Chen', 'michael.chen@example.com', hashedPassword, new Date().toISOString()]);

    await dbRun(`
      INSERT INTO lms_teacher_profiles (id, userId, bio, languages, gender, certifications)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      maleTeacher1ProfileId,
      maleTeacher1Id,
      'Computer Science instructor specializing in programming and web development. Loves helping students build their first applications.',
      'English, Mandarin',
      'male',
      'B.S. Computer Science, AWS Certified Solutions Architect, Full Stack Web Development Certificate'
    ]);

    console.log('✅ Created first male teacher: Michael Chen');

    // Create Second Male Teacher
    const maleTeacher2Id = generateId();
    const maleTeacher2ProfileId = generateId();

    await dbRun(`
      INSERT INTO auth_users (id, role, name, email, hashedPassword, createdAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [maleTeacher2Id, 'teacher', 'David Rodriguez', 'david.rodriguez@example.com', hashedPassword, new Date().toISOString()]);

    await dbRun(`
      INSERT INTO lms_teacher_profiles (id, userId, bio, languages, gender, certifications)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      maleTeacher2ProfileId,
      maleTeacher2Id,
      'Physics and chemistry teacher who enjoys conducting hands-on experiments. Dedicated to making science fun and engaging.',
      'English, Spanish, Portuguese',
      'male',
      'M.S. Physics, B.S. Chemistry, Secondary Science Teaching License, STEM Education Certificate'
    ]);

    console.log('✅ Created second male teacher: David Rodriguez');

    // Create sample leads
    await dbRun(`
      INSERT INTO crm_leads (id, name, email, phone, source, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [generateId(), 'Emma Watson', 'emma.watson@parent.com', '+1-555-0101', 'website', 'new']);

    await dbRun(`
      INSERT INTO crm_leads (id, name, email, phone, source, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [generateId(), 'John Smith', 'john.smith@parent.com', '+1-555-0102', 'referral', 'contacted']);

    console.log('✅ Created sample CRM leads');

    // Create analytics events
    await dbRun(`
      INSERT INTO analytics_events (id, userId, name, properties, timestamp)
      VALUES (?, ?, ?, ?, ?)
    `, [generateId(), femaleTeacherId, 'teacher_login', JSON.stringify({ device: 'desktop', browser: 'chrome' }), new Date().toISOString()]);

    await dbRun(`
      INSERT INTO analytics_events (id, userId, name, properties, timestamp)
      VALUES (?, ?, ?, ?, ?)
    `, [generateId(), maleTeacher1Id, 'lesson_created', JSON.stringify({ subject: 'computer_science', lesson_type: 'programming' }), new Date().toISOString()]);

    await dbRun(`
      INSERT INTO analytics_events (id, userId, name, properties, timestamp)
      VALUES (?, ?, ?, ?, ?)
    `, [generateId(), null, 'page_view', JSON.stringify({ page: '/home', visitor_type: 'guest' }), new Date().toISOString()]);

    console.log('✅ Created sample analytics events');

    // Create message logs
    await dbRun(`
      INSERT INTO comms_message_logs (id, "to", channel, template, status, metadata, sentAt)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [generateId(), 'sarah.johnson@example.com', 'email', 'welcome_teacher', 'sent', JSON.stringify({ campaign_id: 'welcome_2024', sent_by: 'system' }), new Date().toISOString()]);

    await dbRun(`
      INSERT INTO comms_message_logs (id, "to", channel, template, status, metadata, sentAt)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [generateId(), 'michael.chen@example.com', 'email', 'monthly_report', 'delivered', JSON.stringify({ report_month: 'January', student_count: 25 }), new Date().toISOString()]);

    console.log('✅ Created sample message logs');

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log('- 1 Female teacher: Sarah Johnson');
    console.log('- 2 Male teachers: Michael Chen, David Rodriguez');
    console.log('- Sample CRM leads, analytics events, and message logs created');

    db.close();

  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });