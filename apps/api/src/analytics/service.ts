import { Result, createSuccess, createError } from '../types.js';
import {
  AnalyticsEvent,
  TrackEventInput,
  ListEventsInput,
  TrackEventSchema,
  ListEventsSchema,
} from './types.js';

// Mock data store
const events: AnalyticsEvent[] = [];

export async function trackEvent(input: unknown): Promise<Result<AnalyticsEvent>> {
  try {
    const validatedInput = TrackEventSchema.parse(input);
    
    const event: AnalyticsEvent = {
      id: crypto.randomUUID(),
      userId: validatedInput.userId,
      eventName: validatedInput.eventName,
      properties: validatedInput.properties || {},
      timestamp: validatedInput.timestamp ? new Date(validatedInput.timestamp) : new Date(),
      createdAt: new Date(),
    };
    
    events.push(event);
    
    // In real app, this would be sent to analytics service (Mixpanel, Amplitude, etc.)
    console.log(`Event tracked: ${event.eventName}`, event.properties);
    
    return createSuccess(event);
  } catch (error) {
    return createError(`Validation error: ${error}`);
  }
}

export async function listEvents(input: unknown = {}): Promise<Result<AnalyticsEvent[]>> {
  try {
    const validatedInput = ListEventsSchema.parse(input);
    
    let filteredEvents = [...events];
    
    // Apply filters
    if (validatedInput.userId) {
      filteredEvents = filteredEvents.filter(e => e.userId === validatedInput.userId);
    }
    
    if (validatedInput.eventName) {
      filteredEvents = filteredEvents.filter(e => e.eventName === validatedInput.eventName);
    }
    
    if (validatedInput.from) {
      const fromDate = new Date(validatedInput.from);
      filteredEvents = filteredEvents.filter(e => e.timestamp >= fromDate);
    }
    
    if (validatedInput.to) {
      const toDate = new Date(validatedInput.to);
      filteredEvents = filteredEvents.filter(e => e.timestamp <= toDate);
    }
    
    // Sort by timestamp descending and apply limit
    filteredEvents.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    filteredEvents = filteredEvents.slice(0, validatedInput.limit);
    
    return createSuccess(filteredEvents);
  } catch (error) {
    return createError(`Validation error: ${error}`);
  }
}