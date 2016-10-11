'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'Washington Hiking Trails';

/**
 * Array containing washington hikes.
 */
var TRAILS = [
    "Big Creek. Located in the Olympic Peninsula, Hood Canal. 4.5 miles round trip. Gain of 900 feet.",
    "Tunnel Creek, Dosewallips Trailhead. Located in the Olympic Peninsula, Hood Canal. 6.4 miles round trip. Gain of 4550 feet.",
    "Kalaloch, Browns Point. Located in the Olympic Peninsula, Pacific Coast. 4.0 miles round trip. Gain of 25 feet.",
    "Discovery Park Loop Trail. Located in Seattle Tacoma area. 2.8 miles round trip. Gain of 140 feet.",
    "Mount Psi. Located in Snoqualmie, North Bend. 8.0 miles round trip. Gain of 3150 feet.",
    "Spencer Island. Located in Seattle Tacoma area. 6.6 miles round trip.",
    "Snoqualmie Falls. Located in Snoqualmie, North Bend. 1.4 miles round trip. Gain of 250 feet.",
    "Lord Hill Regional Park. Located in Seattle Tacoma area. 10.0 miles round trip. Gain of 200 feet.",
    "Wallace Falls State Park. Located in Central Cascades, Stevens Pass west. 5.6 miles round trip. Gain of 1300 feet.",
    "Lime Kiln Trail. Located in North Cascades, Mountain Loop Highway. 7.0 miles round trip. Gain of 625 feet.",
    "Big Four Ice Caves. Located in North Cascades, Mountain Loop Highway. 2.2 miles round trip. Gain of 220 feet.",
    "Upper Lena Lake. Located in Olympic Peninsula, Hood Canal. 13.9 miles round trip. Gain of 3900 feet.",
    "Mount McCausland. Located in Central Cascades, Stevens Pass east. 7.0 miles round trip. Gain of 1800 feet.",
    "Lake Twentytwo. Located in North Cascades, Mountain Loop Highway. 5.4 miles round trip. Gain of 1350 feet.",
    "Glacier View. Located in Mount Rainier. 4.0 miles round trip. Gain of 900 feet.",
    "Oyster Dome. Located in Bellingham Area. 5.0 miles round trip. Gain of 1900 feet.",
    "Mailbox Peak. Located in Snoqualmie, North Bend. 9.4 miles round trip. Gain of 4000 feet.",
    "Icicle Creek. Located in Leavenworth. 4.0 miles round trip.",
    "Mirror and Cottonwood Lakes. Located in Snoqualmie Pass. 2.2 miles round trip. Gain of 870 feet.",
    "Colchuck Lake. Located in Leavenworth. 8.0 miles round trip. Gain of 2280 feet.",
    "Little Bear Trail. Located in Central Cascades, Entiat Mountains, Lake Chelan. 2.3 miles round trip. Gain of 250 feet.",
    "Cascade Pass and Sahale Arm. Located in North Cascades, North Cascade Highway. 12.0 miles round trip. Gain of 4000 feet.",
    "Horse Shoe Basin. Located in North Cascades, east slope. 12.0 miles round trip. Gain of 1550 feet.",
    "Anderson and Watson Lakes. Located in North Cascades, west slope. 4.0 miles round trip. Gain of 1100 feet.",
    "Park Butte. Located in North Cascades, west slope. 7.5 miles round trip. Gain of 2200 feet.",
    "Chain Lakes. Located in Mount Baker. 2 to 8 miles round trip. Gain of 1700 feet.",
    "Spider Meadow and Phelps Basin. Located in Central Cascades, Stevens pass east. 13.0 miles round trip. Gain of 1900 feet.",
    "Larch Lake. Located in Central Cascades, Stevens pass east. 12.0 miles round trip. Gain of 2450 feet.",
    "Hoh Rainforeset Trail. Located in Olympic National Park. 10.6 miles round trip. Gain of 500 feet.",
    "Rialto Beach and Hole in the wall. Located in Olympic Coast. 4.0 miles round trip.",
    "Sunrise Ridge. Located in North Olympics. 5.2 miles round trip. Gain of 4500 feet.",
    "Quinault River Pony Bridge Enchanted Valley. Located in Olympic National Park. 5.0 miles round trip. Gain of 900 feet.",
    "Tolmie Peak Lookout, Eunice Lake. Located in Mount Rainier north west. 7.5 miles round trip. Gain of 1100 feet.",
    "South Coldwater Trail. Located in South Cascades, Mount St. Hellens. 10.0 miles round trip. Gain of 2100 feet.",
    "Harry's Ridge. Located in South Cascades, Mount St. Helens. 8.0 miles round trip. Gain of 1400 feet.",
    "Snow grass flats, Cispus Basin, Nannie Ridge Loop. Located in Goat Rocks Wilderness. 19.6 miles round trip. Gain of 3000 feet.",
    "Steam boat rock. Located in Eastern Washington. 4.0 miles round trip. Gain of 650 feet.",
    "Oregon Butte. Located in Eastern Washington Palouse. 6.0 miles round trip. Gain of 987 feet.",
    "Salmo Priest Loop. Located in Eastern Washington Inland north west. 19.0 miles round trip. Gain of 3400 feet.",
    "Poo Poo Point. Located in Issaquah Alps. 7.2 miles round trip. Gain of 1858 feet.",
    "Snow Lake. Located in Snoqualmie Pass. 7.2 miles round trip. Gain of 1800 feet.",
    "Cedar Falls. Located in North Cascades Highway. 3.5 miles round trip. Gain of 3000 feet.",
    "Boulder River. Located in Mountain Loop Highway. 8.6 miles round trip. Gain of 850 feet.",
    "Wallace Falls. Located in Stevens Pass. 5.5 miles round trip. Gain of 300 feet.",
    "Twin Falls. Located in Snoqualmie, North Bend. 3.0 miles round trip. Gain of 500 feet.",
    "Franklin Falls. Located in Snoqualmie Pass. 2.0 miles round trip. Gain of 2200 feet.",
    "Bridal Veil Falls. Located in Stevens Pass. 5.0 miles round trip. Gain of 800 feet.",
    "Sol Duc Falls. Located in north Olympics. 1.6 miles round trip. Gain of 1800 feet.",
    "Marymere Falls. Located in north Olympics. 2.0 miles round trip. Gain of 700 feet.",
    "Upper Siouxon Horseshoe Falls. Located in Indian Heaven. 4.5 miles round trip. Gain of 500 feet.",
    "Lower Falls Creek. Located in Columbia Gorge. 5.0 miles round trip. Gain of 1400 feet.",
    "Ancient Lake. Located in Wenatchee. 4.0 miles round trip. Gain of 850 feet.",
    "Palouse Falls. Located in Tri Cities. 2.0 miles round trip. Gain of 293 feet.",
    "Lake Serene. Located in Central Cascades, Stevens Pass west. 8.2 miles round trip. Gain of 2000 feet.",
    "Rattlesnake Ledge. Located in Snoqualmie, North Bend. 4.0 miles round trip. Gain of 1160 feet.",
    "Blanca Lake. Located in Central Cascades, Stevens Pass. 7.5 miles round trip. Gain of 3300 feet.",
    "Ape Caves. Located in South Cascades, Mount St. Helens. 2.8 miles round trip. Gain of 350 feet."
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetTrail');
    },
    'GetHikeIntent': function () {
        this.emit('GetTrail');
    },
    'GetTrail': function () {
        // Get a random trail from the TRAILS array
        var trailIndex = Math.floor(Math.random() * TRAILS.length);
        var randomTrail = TRAILS[trailIndex];

        // Create speech output
        var speechOutput = "Here's your hike: " + randomTrail;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomTrail)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say give me a hike, or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};
