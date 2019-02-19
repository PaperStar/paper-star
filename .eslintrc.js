module.exports = {
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    env: { 
        es6: true 
    },
    "extends": ["eslint:recommended", "google"],
    "globals": {
        "cc": true,
        "Global": true,
        "wx": true,
        "window": true
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'new-cap': ["error", { "capIsNew": false }]
    }
};
