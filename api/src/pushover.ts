const PUSHOVER_API_URL = 'https://api.pushover.net/1/messages.json';

interface PushoverResponse {
  status: number;
  request: string;
  errors?: string[];
}

export async function sendPushNotification(
  message: string,
  title?: string
): Promise<{ success: boolean; error?: string }> {
  const token = process.env.PUSHOVER_TOKEN;
  const user = process.env.PUSHOVER_USER;

  if (!token || !user) {
    console.error('Pushover credentials not configured');
    return { success: false, error: 'Pushover not configured' };
  }

  try {
    const response = await fetch(PUSHOVER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        user,
        message,
        title: title || 'Portfolio Contact',
      }),
    });

    const data = (await response.json()) as PushoverResponse;

    if (data.status === 1) {
      console.log('Pushover notification sent successfully');
      return { success: true };
    } else {
      console.error('Pushover error:', data.errors);
      return { success: false, error: data.errors?.join(', ') };
    }
  } catch (error) {
    console.error('Failed to send Pushover notification:', error);
    return { success: false, error: 'Network error' };
  }
}

export async function recordContactDetails(
  email: string,
  message?: string
): Promise<{ recorded: boolean }> {
  const notificationMessage = message
    ? `New contact from portfolio:\n\nEmail: ${email}\nMessage: ${message}`
    : `New contact from portfolio:\n\nEmail: ${email}`;

  const result = await sendPushNotification(notificationMessage, 'New Portfolio Lead');

  return { recorded: result.success };
}
