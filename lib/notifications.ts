// Push notifications — PRD Feature 7
// Cultural copy, never "Don't break your streak!"

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function requestPermission() {
  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function configureChannelsAndroid() {
  if (Platform.OS !== 'android') return;
  await Notifications.setNotificationChannelAsync('daily', {
    name: 'Daily reminders',
    importance: Notifications.AndroidImportance.DEFAULT,
    sound: 'default',
  });
  await Notifications.setNotificationChannelAsync('streak', {
    name: 'Streak alerts',
    importance: Notifications.AndroidImportance.HIGH,
    sound: 'default',
  });
  await Notifications.setNotificationChannelAsync('milestone', {
    name: 'Milestone celebrations',
    importance: Notifications.AndroidImportance.HIGH,
    sound: 'default',
  });
}

/** Word of the day · sent at user-chosen time */
export async function scheduleDailyReminder(hour: number, minute: number) {
  await Notifications.cancelAllScheduledNotificationsAsync();
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'essi — water · إيسي',
      body: 'The same root your grandmother used for the river. Lesson 4 is waiting.',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
    },
  });
}

/** Streak-at-risk · 23h since last lesson. PRD copy. */
export async function scheduleStreakAtRisk() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'essi',
      body: 'نسيت تسقي جذورك النهارده؟  · Did you forget to water your roots today?',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 60 * 60 * 23,
      repeats: false,
    },
  });
}
