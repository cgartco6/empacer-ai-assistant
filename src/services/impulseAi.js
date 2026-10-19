export function generateImpulseOfferPrompt(productName, priceZAR, memoryContext) {
  return `Act as a master conversion copywriter targeting impulse buyers on TikTok, Instagram Reels, and WhatsApp Groups.
Target Product: ${productName}
Price: R${priceZAR} ZAR
Business Context: ${JSON.stringify(memoryContext)}

Generate a high-urgency, high-converting social media draft designed to cause instant buying decisions.
Include:
1. Hook (Pattern Interrupt)
2. Scarcity trigger ("Only 5 left at this price")
3. Clear Call to Action with immediate payment link hint.
4. Compliant with platform rules.

Return output strictly as JSON with keys: title, target, content, platform, scarcityMessage.`;
}
