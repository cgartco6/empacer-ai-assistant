export const PLATFORM_COMPLIANCE_RULES = {
  whatsapp: {
    name: 'WhatsApp Business & Channels',
    maxChars: 4096,
    rules: [
      { id: 'wa_spam', regex: /(buy now fast|claim 100% free money)/i, error: 'WhatsApp flags aggressive spam phrases.' },
      { id: 'wa_links', maxLinks: 3, error: 'Too many links trigger WhatsApp automated account suspension.' }
    ]
  },
  youtube: {
    name: 'YouTube Shorts & Videos',
    maxChars: 5000,
    rules: [
      { id: 'yt_tags', regex: /(#\w+){15,}/i, error: 'YouTube penalizes posts with over 15 hashtags as spam.' },
      { id: 'yt_misleading', regex: /(clickbait|free bitcoin)/i, error: 'Violation of YouTube Spam & Deceptive Practices policy.' }
    ]
  },
  tiktok: {
    name: 'TikTok',
    maxChars: 2200,
    rules: [
      { id: 'tt_copyright', regex: /(full original soundtrack|copyrighted audio)/i, error: 'Ensure commercial license for external audio.' },
      { id: 'tt_redirect', regex: /(link in bio 5 times)/i, error: 'Repeated redirect spam reduces reach on For You Page.' }
    ]
  },
  facebook: {
    name: 'Facebook Pages & Groups',
    maxChars: 63206,
    rules: [
      { id: 'fb_engagement_bait', regex: /(like this post if|share to 10 friends)/i, error: 'Facebook demotes Engagement Bait posts.' }
    ]
  },
  instagram: {
    name: 'Instagram Feed & Reels',
    maxChars: 2200,
    rules: [
      { id: 'ig_hashtags', maxHashtags: 30, error: 'Instagram strictly limits posts to 30 hashtags.' }
    ]
  },
  x: {
    name: 'X (Twitter)',
    maxChars: 280,
    rules: [
      { id: 'x_length', maxLength: 280, error: 'Standard X post limit exceeded (280 characters).' }
    ]
  },
  truth_social: {
    name: 'Truth Social',
    maxChars: 500,
    rules: [
      { id: 'ts_length', maxLength: 500, error: 'Truth Social character limit exceeded (500 characters).' }
    ]
  }
};
