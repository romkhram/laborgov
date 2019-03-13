/**
 * App Config File
 */
export default {
	appLogo: '/ui/static/img/site-logo.png',                                   // App Logo,
	darkLogo: '/ui/static/img/site-dark-logo.png',							         // dark logo
	appLogo2: '/ui/static/img/session.png',                                    // App Logo 2 For Login & Signup Page
	brand: 'Eais',                                        			         // Brand Name
	copyrightText: 'Eais © 2019 All Rights Reserved.',                     // Copyright Text
	enableUserTour: process.env.NODE_ENV === 'production' ? true : false    // Enable User Tour
}
