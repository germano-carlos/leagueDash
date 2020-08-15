var express = require('express');
var router = express.Router();

// Dashboard
router.get('/', function (req, res) {
   res.render('Dashboard/dashboard');
})
router.get('/index', function (req, res) {
    res.render('Dashboard/dashboard');
 })

// Calendar
router.get('/calendar', function (req, res) {
    res.render('Calendar/calendar');
})

// Email
router.get('/email-inbox', function (req, res) {
    res.render('Email/email_inbox');
})
router.get('/email-compose', function (req, res) {
    res.render('Email/email_compose');
})
router.get('/email-read', function (req, res) {
    res.render('Email/email_read');
})
router.get('/email-template-Alert', function (req, res) {
    res.render('Email/email_template_Alert');
})
router.get('/email-template-basic', function (req, res) {
    res.render('Email/email_template_basic');
})
router.get('/email-template-Billing', function (req, res) {
    res.render('Email/email_template_Billing');
})

// UI Elements
router.get('/ui-alerts', function (req, res) {
    res.render('UiElements/ui_alerts');
})
router.get('/ui-buttons', function (req, res) {
    res.render('UiElements/ui_buttons');
})
router.get('/ui-cards', function (req, res) {
    res.render('UiElements/ui_cards');
})
router.get('/ui-carousel', function (req, res) {
    res.render('UiElements/ui_carousel');
})
router.get('/ui-dropdowns', function (req, res) {
    res.locals = {  title: 'UI Dropdowns' };
    res.render('UiElements/ui_dropdowns');
})
router.get('/ui-grid', function (req, res) {
    res.render('UiElements/ui_grid');
})
router.get('/ui-images', function (req, res) {
    res.render('UiElements/ui_images');
})
router.get('/ui-lightbox', function (req, res) {
    res.render('UiElements/ui_lightbox');
})
router.get('/ui-modals', function (req, res) {

    res.render('UiElements/ui_modals');
})
router.get('/ui-pagination', function (req, res) {
    res.render('UiElements/ui_pagination');
})
router.get('/ui-popover-tooltips', function (req, res) {
    res.render('UiElements/ui_popover_tooltips');
})
router.get('/ui-rangeslider', function (req, res) {
    res.render('UiElements/ui_rangeslider');
})
router.get('/ui-session-timeout', function (req, res) {
    res.locals = {  title: 'UI Session Timeout' };
    res.render('UiElements/ui_session_timeout');
})
router.get('/ui-progressbars', function (req, res) {
    res.render('UiElements/ui_progressbars');
})
router.get('/ui-sweet-alert', function (req, res) {
    res.render('UiElements/ui_sweet_alert');
})
router.get('/ui-tabs-accordions', function (req, res) {
    res.render('UiElements/ui_tabs_accordions');
})
router.get('/ui-typography', function (req, res) {
    res.render('UiElements/ui_typography');
})
router.get('/ui-video', function (req, res) {
    res.render('UiElements/ui_video');
})
router.get('/ui-colors', function (req, res) {
    res.render('UiElements/ui_colors');
})
router.get('/ui-general', function (req, res) {
    res.render('UiElements/ui_general');
})
router.get('/ui-rating', function (req, res) {
    res.render('UiElements/ui_rating');
})

// Form Elements
router.get('/form-elements', function (req, res) {
    res.render('Forms/form_elements');
})
router.get('/form-validation', function (req, res) {
    res.render('Forms/form_validation');
})
router.get('/form-advanced', function (req, res) {
    res.render('Forms/form_advanced');
})
router.get('/form-editors', function (req, res) {
    res.render('Forms/form_editors');
})
router.get('/form-uploads', function (req, res) {
    res.render('Forms/form_uploads');
})
router.get('/form-xeditable', function (req, res) {
    res.render('Forms/form_xeditable');
})
router.get('/form-mask', function (req, res) {
    res.render('Forms/form_mask');
})
router.get('/form-repeater', function (req, res) {
    res.render('Forms/form_repeater');
})
router.get('/form-wizard', function (req, res) {
    res.render('Forms/form_wizard');
})

// Charts
router.get('/charts-morris', function (req, res) {
    res.render('Charts/charts_morris');
})
router.get('/charts-chartist', function (req, res) {
    res.render('Charts/charts_chartist');
})
router.get('/charts-chartjs', function (req, res) {
    res.render('Charts/charts_chartjs');
})
router.get('/charts-flot', function (req, res) {
    res.render('Charts/charts_flot');
})
router.get('/charts-echart', function (req, res) {
    res.render('Charts/charts_echart');
})
router.get('/charts-sparkline', function (req, res) {
    res.render('Charts/charts_sparkline');
})
router.get('/charts-knob', function (req, res) {
    res.render('Charts/charts_knob');
})
router.get('/charts-echart', function (req, res) {
    res.render('Charts/charts_echart');
})

//tables
router.get('/tables-basic', function (req, res) {
    res.render('Tables/tables_basic');
})
router.get('/tables-datatable', function (req, res) {
    res.render('Tables/tables_datatable');
})
router.get('/tables-responsive', function (req, res) {
    res.render('Tables/tables_responsive');
})
router.get('/tables-editable', function (req, res) {
    res.render('Tables/tables_editable');
})

//Icons  
router.get('/icons-material', function (req, res) {
    res.render('Icons/icons_material');
})
router.get('/icons-ion', function (req, res) {
    res.render('Icons/icons_ion');
})
router.get('/icons-fontawesome', function (req, res) {
    res.render('Icons/icons_fontawesome');
})
router.get('/icons-themify', function (req, res) {
    res.render('Icons/icons_themify');
})
router.get('/icons-dripicons', function (req, res) {
    res.render('Icons/icons_dripicons');
})
router.get('/icons-typicons', function (req, res) {
    res.render('Icons/icons_typicons');
})

//Google Maps
router.get('/maps-google', function (req, res) {
    res.render('Maps/maps_google');
})
router.get('/maps-vector', function (req, res) {
    res.render('Maps/maps_vector');
})

//Extra pages
router.get('/pages-directory', function (req, res) {
    res.render('Pages/pages_directory');
})
router.get('/pages-faq', function (req, res) {
    res.render('Pages/pages_faq');
})
router.get('/pages-gallery', function (req, res) {
    res.render('Pages/pages_gallery');
})
router.get('/pages-invoice', function (req, res) {
    res.render('Pages/pages_invoice');
})
router.get('/pages-blank', function (req, res) {
    res.render('Pages/pages_blank');
})
router.get('/pages-timeline', function (req, res) {
    res.render('Pages/pages_timeline');
})
router.get('/pages-pricing', function (req, res) {
    res.render('Pages/pages_pricing');
})

module.exports = router;