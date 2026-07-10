const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Add 'ogg' and 'mp3' to the list of assets extensions recognized by Metro
config.resolver.assetExts.push('ogg', 'mp3');

module.exports = withNativeWind(config, { input: './global.css' });
