const paypal = require('paypal-rest-sdk')

paypal.configure({
    mode: 'sandbox', // or 'live' for production
    client_id: 'AYLcPTPRkGdCx02yH3LG-gm9O75MtJgtnfF3FojNxYBee4oFRwCB67403UlfI94-Vtt3eWlLW8i10A1x', // Replace with your sandbox client ID
    client_secret: 'EHG-HuI0zMINSizSvfh_SPL4ejISYEcyDXnaucPa95r8shkW6J4oHjns3VsnT_1ZJGiVOICkRAqx5kvf' // Replace with your sandbox secret
});

module.exports = paypal;