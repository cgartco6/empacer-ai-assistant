import { PLATFORM_COMPLIANCE_RULES } from '../config/complianceRules';

export function validateSocialPost(content, platform = 'instagram') {
  const platformRules = PLATFORM_COMPLIANCE_RULES[platform] || PLATFORM_COMPLIANCE_RULES.instagram;
  const warnings = [];
  const errors = [];

  // Check Length
  if (platformRules.maxChars && content.length > platformRules.maxChars) {
    errors.push(`Length (${content.length} chars) exceeds ${platformRules.name} limit of ${platformRules.maxChars}.`);
  }

  // Check Hashtags
  const hashtags = (content.match(/#\w+/g) || []).length;
  if (platformRules.name === 'Instagram' && hashtags > 30) {
    errors.push(`Contains ${hashtags} hashtags. Instagram max limit is 30.`);
  }

  // Check Custom Rules
  platformRules.rules.forEach((rule) => {
    if (rule.regex && rule.regex.test(content)) {
      errors.push(rule.error);
    }
  });

  return {
    isCompliant: errors.length === 0,
    errors,
    warnings,
    platformName: platformRules.name
  };
}
