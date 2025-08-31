import EventEmitter from 'eventemitter3';
import { Event, EventSchema } from './schemas';

class EventBus extends EventEmitter {
  emitEvent<T extends Event>(event: T): boolean {
    // Validate event schema
    const result = EventSchema.safeParse(event);
    if (!result.success) {
      throw new Error(`Invalid event: ${result.error.message}`);
    }

    // Emit the event
    super.emit(event.type, event);
    super.emit('*', event); // Global listener

    return true;
  }

  onEvent<T extends Event>(eventType: T['type'] | '*', listener: (event: T) => void): this {
    return super.on(eventType, listener);
  }

  offEvent<T extends Event>(eventType: T['type'] | '*', listener: (event: T) => void): this {
    return super.off(eventType, listener);
  }

  onceEvent<T extends Event>(eventType: T['type'] | '*', listener: (event: T) => void): this {
    return super.once(eventType, listener);
  }
}

// Singleton instance
export const eventBus = new EventBus();

// Factory for creating events with automatic timestamp
export function createEvent<T extends Omit<Event, 'timestamp'>>(
  eventData: T
): T & { timestamp: Date } {
  return {
    ...eventData,
    timestamp: new Date(),
  };
}