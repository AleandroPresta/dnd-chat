(function (window) {
    window.__env__ = window.__env__ || {};

    // Environment variables
    window.__env__.HUGGINGFACE_API_KEY = '${HUGGINGFACE_API_KEY}';

    // Whether or not to enable debug mode
    window.__env__.enableDebug = true;
})(this);
