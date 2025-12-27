/**
 * Feature flag system
 * Toggle features without redeploying
 */

// In production, this would come from a feature flag service (LaunchDarkly, etc.)
const flags = {
  enableDiscount: process.env.FEATURE_DISCOUNT === 'true',
  enableNewCheckout: process.env.FEATURE_NEW_CHECKOUT === 'true',
  enableRecommendations: process.env.FEATURE_RECOMMENDATIONS === 'true'
};

function isEnabled(flagName) {
  return flags[flagName] || false;
}

function getAllFlags() {
  return flags;
}

// Simulate feature flag service API
function updateFlag(flagName, enabled) {
  flags[flagName] = enabled;
  console.log(`Feature flag ${flagName} ${enabled ? 'enabled' : 'disabled'}`);
}

module.exports = { isEnabled, getAllFlags, updateFlag };

