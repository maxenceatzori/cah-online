import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';

const BLACK_CARDS = [
  { text: "Hey Reddit! I'm ___. Ask me anything.", pick: 1 },
  { text: "Introducing X-treme Baseball! It's like baseball, but with ___!", pick: 1 },
  { text: "What is Batman's guilty pleasure?", pick: 1 },
  { text: "TSA guidelines now prohibit ___ on airplanes.", pick: 1 },
  { text: "Next from J.K. Rowling: Harry Potter and the Chamber of ___.", pick: 1 },
  { text: "That's right, I killed ___. How, you ask? ___.", pick: 2 },
  { text: "I'm sorry, Professor, but I couldn't complete my homework because of ___.", pick: 1 },
  { text: "And the Academy Award for ___ goes to ___.", pick: 2 },
  { text: "Dude, do not go in that bathroom. There's ___ in there.", pick: 1 },
  { text: "How did I lose my virginity?", pick: 1 },
  { text: "It's a pity that kids these days are all getting involved with ___.", pick: 1 },
  { text: "Step 1: ___. Step 2: ___. Step 3: Profit.", pick: 2 },
  { text: "___ . Betcha can't have just one!", pick: 1 },
  { text: "Kids, I don't need drugs to get high. I'm high on ___.", pick: 1 },
  { text: "For my next trick, I will pull ___ out of ___.", pick: 2 },
  { text: "In the new Disney Channel Original Movie, Hannah Montana struggles with ___ for the first time.", pick: 1 },
  { text: "What's my secret power?", pick: 1 },
  { text: "I'm going on a cleanse this week. Nothing but kale juice and ___.", pick: 1 },
  { text: "___ + ___ = ___.", pick: 3 },
  { text: "When Pharaoh remained unmoved, Moses called down a Plague of ___.", pick: 1 },
  { text: "Just once, I'd like to hear you say 'Thanks, Mom. Thanks for ___.'", pick: 1 },
  { text: "Daddy, why is mommy crying?", pick: 1 },
  { text: "When I was tripping on acid, ___ turned into ___.", pick: 2 },
  { text: "50% of all marriages end in ___.", pick: 1 },
  { text: "Instead of coal, Santa now gives the bad children ___.", pick: 1 },
  { text: "Maybe she's born with it. Maybe it's ___.", pick: 1 },
  { text: "My name is Peter Parker. I was bitten by a radioactive spider, and now I'm ___.", pick: 1 },
  { text: "White people like ___.", pick: 1 },
  { text: "___ is a slippery slope that leads to ___.", pick: 2 },
  { text: "Why do I hurt all over?", pick: 1 },
  { text: "A romantic, candlelit dinner would be incomplete without ___.", pick: 1 },
  { text: "Just saw this upsetting video! Please retweet!! #stop___.", pick: 1 },
  { text: "Fun tip! When your man asks you to go down on him, try surprising him with ___ instead.", pick: 1 },
  { text: "The class field trip was completely ruined by ___.", pick: 1 },
  { text: "What's a girl's best friend?", pick: 1 },
  { text: "Dear Abby, I'm having some trouble with ___ and would like your advice.", pick: 1 },
  { text: "In Jordan Peele's new thriller, a young family discovers that ___ had really been ___ all along.", pick: 2 },
  { text: "When I am President, I will create the Department of ___.", pick: 1 },
  { text: "What are my parents hiding from me?", pick: 1 },
  { text: "What never fails to liven up the party?", pick: 1 },
  { text: "IF you like ___, YOU MIGHT BE A REDNECK.", pick: 1 },
  { text: "Make a haiku.", pick: 3 },
  { text: "What made my first kiss so awkward?", pick: 1 },
  { text: "I got 99 problems but ___ ain't one.", pick: 1 },
  { text: "___ . It's a trap!", pick: 1 },
  { text: "Hulu's new reality show features twelve hot singles living with ___.", pick: 1 },
  { text: "What would grandma find disturbing, yet oddly charming?", pick: 1 },
  { text: "___ . That was so metal.", pick: 1 },
  { text: "I never truly understood ___ until I encountered ___.", pick: 2 },
  { text: "During sex, I like to think about ___.", pick: 1 },
  { text: "What ended my last relationship?", pick: 1 },
  { text: "What's that sound?", pick: 1 },
  { text: "Uh, hey guys, I know this was my idea, but I'm having serious doubts about ___.", pick: 1 },
  { text: "Why am I sticky?", pick: 1 },
  { text: "I'm no doctor, but I'm pretty sure what you're suffering from is called '___.'", pick: 1 },
  { text: "What's there a ton of in heaven?", pick: 1 },
  { text: "After four platinum albums and three Grammys, it's time to get back to my roots, to what inspired me to make music in the first place: ___.", pick: 1 },
  { text: "What will always get you laid?", pick: 1 },
  { text: "They said we were crazy. They said we couldn't put ___ inside of ___. They were wrong.", pick: 2 },
  { text: "Lifetime® presents '___ : the Story of ___.'", pick: 2 },
  { text: "___ : kid-tested, mother-approved.", pick: 1 },
  { text: "Why can't I sleep at night?", pick: 1 },
  { text: "What's that smell?", pick: 1 },
  { text: "Why is Brett so sweaty?", pick: 1 },
  { text: "This is the way the world ends / This is the way the world ends / Not with a bang but with ___.", pick: 1 },
  { text: "Coming to Broadway this season, ___ : The Musical.", pick: 1 },
  { text: "Here is the church / Here is the steeple / Open the doors / And there is ___.", pick: 1 },
  { text: "But before I kill you, Mr. Bond, I must show you ___.", pick: 1 },
  { text: "A recent laboratory study shows that undergraduates have 50% less sex after being exposed to ___.", pick: 1 },
  { text: "Introducing the amazing superhero/sidekick duo! It's ___ and ___!", pick: 2 },
  { text: "When I am a billionaire, I shall erect a 50-foot statue to commemorate ___.", pick: 1 },
  { text: "War! What is it good for?", pick: 1 },
  { text: "What gives me uncontrollable gas?", pick: 1 },
  { text: "The new Chevy Tahoe. With the power and space to take ___ everywhere you go.", pick: 1 },
  { text: "Well if you'll excuse me, gentlemen, I have a date with ___.", pick: 1 },
  { text: "Alternative medicine is now embracing the curative powers of ___.", pick: 1 },
  { text: "As the mom of five rambunctious boys, I'm no stranger to ___.", pick: 1 },
  { text: "___ . High five, bro.", pick: 1 },
  { text: "Today on Maury: 'Help! My son is ___!'", pick: 1 },
  { text: "I get by with a little help from ___.", pick: 1 },
  { text: "★☆☆☆☆ Do NOT go here! Found ___ in my fettuccine alfredo!", pick: 1 },
  { text: "I drink to forget ___.", pick: 1 },
  { text: "What makes life worth living?", pick: 1 },
  { text: "Old MacDonald had ___. E-I-E-I-O.", pick: 1 },
  { text: "The doctor said it's completely normal for your ___ to do that after 40.", pick: 1 },
  { text: "Scientists have confirmed that ___ is the leading cause of mid-life crises.", pick: 1 },
  { text: "My therapist says I need to stop blaming ___ for all my problems.", pick: 1 },
  { text: "What did I accidentally like while stalking my ex on Instagram?", pick: 1 },
  { text: "My Airbnb review: Two stars. Would not recommend due to ___.", pick: 1 },
  { text: "The reason I haven't replied to that email for three weeks is ___.", pick: 1 },
  { text: "My financial advisor told me to stop spending money on ___ and start thinking about retirement.", pick: 1 },
  { text: "What's the best part about working from home?", pick: 1 },
  { text: "I told my kids Santa isn't real. They asked what was. I said ___.", pick: 1 },
  { text: "My Uber driver would not stop talking about ___.", pick: 1 },
  { text: "What did the mortgage broker forget to mention?", pick: 1 },
  { text: "I haven't slept properly since ___.", pick: 1 },
  { text: "The only thing keeping my marriage together is ___.", pick: 1 },
  { text: "HR would like everyone to stop bringing ___ to the office.", pick: 1 },
  { text: "My back went out because of ___.", pick: 1 },
  { text: "What do millennials have instead of a pension?", pick: 1 },
  { text: "At my age, a wild Friday night involves ___.", pick: 1 },
  { text: "My doctor said I need to cut back on ___ or face the consequences.", pick: 1 },
  { text: "What is the Gen Z employee doing that I don't understand?", pick: 1 },
  { text: "I pretend to have plans so I don't have to attend ___.", pick: 1 },
  { text: "What did I find in my child's search history?", pick: 1 },
  { text: "The housing market collapsed because of ___.", pick: 1 },
  { text: "What are my parents sending me WhatsApp voice messages about?", pick: 1 },
  { text: "My biggest regret from my 20s is ___.", pick: 1 },
  { text: "The airline lost my luggage and somehow also ___.", pick: 1 },
  { text: "What did I buy at 3am on Amazon that I now deeply regret?", pick: 1 },
  { text: "Why is my dad suddenly into ___?", pick: 1 },
  { text: "According to my wearable device, I need more ___ in my life.", pick: 1 },
  { text: "My couples therapist said we need to talk about ___.", pick: 1 },
  { text: "I put ___ on my CV. It was technically true.", pick: 1 },
  { text: "My midlife crisis manifested as ___.", pick: 1 },
  { text: "Climate change will be solved by ___.", pick: 1 },
  { text: "What did my Airbnb host describe as 'cosy'?", pick: 1 },
  { text: "My children will inherit ___ and nothing else.", pick: 1 },
  { text: "The last thing I googled before bed was ___.", pick: 1 },
  { text: "I told my parents I was doing well. The truth was ___.", pick: 1 },
  { text: "What am I pretending to understand in the meeting?", pick: 1 },
  { text: "I haven't been to the gym since ___.", pick: 1 },
  { text: "My ex got really into ___ after we broke up.", pick: 1 },
  { text: "What is the unspoken rule of every office kitchen?", pick: 1 },
  { text: "What is Elon Musk's actual problem?", pick: 1 },
  { text: "Brexit was caused by ___.", pick: 1 },
  { text: "What do I tell myself to feel better about my life choices?", pick: 1 },
  { text: "The perfect date is ___ followed by ___.", pick: 2 },
  { text: "My therapist suggested I try ___. My dealer suggested ___.", pick: 2 },
  { text: "I grew up thinking adulthood meant ___ and ___. I was wrong.", pick: 2 },
  { text: "In my 20s I wanted ___. In my 40s all I want is ___.", pick: 2 },
  { text: "My dating profile says I'm looking for ___. What I'm actually looking for is ___.", pick: 2 },
  { text: "The new government's economic plan involves taxing ___ and subsidising ___.", pick: 2 },
  { text: "I told my kids the secret to life is ___ and ___.", pick: 2 },
  { text: "Coming to Netflix this autumn: ___, the true story of ___.", pick: 2 },
  { text: "My Google search history is 40% ___ and 60% ___.", pick: 2 },
  { text: "The documentary was about ___ but was really about ___.", pick: 2 },
  { text: "Nothing brings Australians together like ___.", pick: 1 },
  { text: "Scott Morrison was secretly also the Minister for ___.", pick: 1 },
  { text: "The Bunnings sausage sizzle was completely ruined by ___.", pick: 1 },
  { text: "My HECS debt will be paid off by ___.", pick: 1 },
  { text: "The RBA raised interest rates because of ___.", pick: 1 },
  { text: "I drove past a house in Sydney and cried because of ___.", pick: 1 },
  { text: "What killed bulk billing?", pick: 1 },
  { text: "My tradie left the job half-finished and blamed ___.", pick: 1 },
  { text: "The real reason Australians go to Bali is ___.", pick: 1 },
  { text: "Australia's next Prime Minister will fix the housing crisis with ___.", pick: 1 },
  { text: "What is nesting in my roof?", pick: 1 },
  { text: "I waited three months to see a GP and all I got was ___.", pick: 1 },
  { text: "The NBN is slow because of ___.", pick: 1 },
  { text: "Woolworths and Coles have been price-gouging Australians with ___.", pick: 1 },
  { text: "I paid $4,500 a fortnight in childcare and still couldn't get ___.", pick: 1 },
  { text: "The Married At First Sight producers really outdid themselves with ___.", pick: 1 },
  { text: "State of Origin was decided by ___.", pick: 1 },
  { text: "Peter Dutton's secret hobby is ___.", pick: 1 },
  { text: "What is Pauline Hanson concerned about now?", pick: 1 },
  { text: "The ATO would like a word about ___.", pick: 1 },
  { text: "Australia has the world's most dangerous ___ and somehow that's fine.", pick: 1 },
  { text: "Negative gearing exists to ensure that ___.", pick: 1 },
  { text: "My Bunnings run was supposed to take 20 minutes. I came back four hours later with ___.", pick: 1 },
  { text: "What is Australia's greatest export after iron ore and embarrassing politicians?", pick: 1 },
  { text: "A rogue ___ shut down the M1 for six hours.", pick: 1 },
  { text: "The real Australian dream is ___, not home ownership.", pick: 1 },
  { text: "Selling my house: described as ___. Was actually ___.", pick: 2 },
  { text: "The government's solution to housing affordability is ___ and ___.", pick: 2 },
  { text: "My Australian retirement plan: ___ and ___.", pick: 2 },
  { text: "At the school drop-off, Karen lost her mind over ___ and ___.", pick: 2 },
  { text: "The reason everyone in Byron Bay looks so well-rested is ___.", pick: 1 },
  { text: "My Bondi apartment cost $2.8 million. It came with ___.", pick: 1 },
  { text: "The Byron Bay council rejected the development application because of ___.", pick: 1 },
  { text: "What replaced the locals in Byron Bay?", pick: 1 },
  { text: "Chris Hemsworth moved to Byron for the lifestyle and instead found ___.", pick: 1 },
  { text: "My wellness retreat in Byron Bay cured my ___ but gave me ___.", pick: 2 },
  { text: "Nothing says 'I've moved to Byron' like ___.", pick: 1 },
  { text: "Sydney's WestConnex was supposed to fix traffic. Instead it created ___.", pick: 1 },
  { text: "The North Shore private school mum's secret is ___.", pick: 1 },
  { text: "I paid $22 for an acai bowl in Byron Bay and found ___ in it.", pick: 1 },
  { text: "The thing keeping Byron Bay weird is ___.", pick: 1 },
  { text: "Schoolies week in Byron Bay was ruined by ___.", pick: 1 },
  { text: "The Byron Bay Facebook group had a meltdown over ___.", pick: 1 },
  { text: "What's the most Byron Bay thing you can do on a Tuesday?", pick: 1 },
  { text: "I went to a cacao ceremony in Byron and accidentally ___.", pick: 1 },
  { text: "The Bondi to Coogee walk was completely ruined by ___.", pick: 1 },
  { text: "Property prices in Byron Bay went up because of ___ and ___.", pick: 2 },
  { text: "The Eastern Suburbs mum wouldn't stop talking about ___.", pick: 1 },
  { text: "Sydney's train network runs on ___ and broken promises.", pick: 1 },
  { text: "What's the real reason Sydneysiders move to Byron Bay?", pick: 1 },
  { text: "I moved to Byron Bay for the lifestyle. Six months later I was doing ___.", pick: 1 },
  { text: "The breathwork facilitator said ___ would heal my inner child.", pick: 1 },
  { text: "Splendour in the Grass was cancelled again due to ___.", pick: 1 },
  { text: "The Newtown share house had six people, one bathroom, and ___.", pick: 1 },
  { text: "What does a $4 million Paddington terrace come with?", pick: 1 },
  { text: "Moving to the Northern Beaches means never having to think about ___ again.", pick: 1 },
  { text: "The locals vs blow-ins debate in Byron Bay was settled by ___.", pick: 1 },
];

const WHITE_CARDS = [
  "Silence.", "The illusion of choice in a late-stage capitalist society.", "Many bats.", "Hot Asian men.",
  "Shame.", "Website.", "Assaulting a police officer.", "Magnets.",
  "A sorry excuse for a father.", "Seeing what happens when you lock people in a room with hungry seagulls.", "A crucifixion.", "A narc.",
  "Boneless buffalo wings.", "A live studio audience.", "Complaining.", "Authentic Mexican cuisine.",
  "Doing crimes.", "COVID-19.", "Crippling debt.", "Daddy issues.",
  "Working in an Amazon warehouse.", "A fart so powerful that it wakes the giants from their thousand-year slumber.", "Full frontal nudity.",
  "Covering myself with Parmesan cheese and chili flakes because I am pizza.", "Laying an egg.", "Getting naked and watching Nickelodeon.", "Pretending to care.",
  "Having big dreams but no realistic way to achieve them.", "Seeing Grandma naked.", "Boogers.", "The miracle of childbirth.", "A positive attitude!", "Having a stroke.", "White privilege.",
  "Emerging from the sea and rampaging through Tokyo.", "The tampon from my vagina.", "The Blood of Christ.",
  "Soft, kissy missionary sex.", "BATMAN!", "Agriculture.", "Barely making $25,000 a year.",
  "Natural selection.", "Boomers.", "Dropping a hot doodie out of my turd hole.", "My abusive boyfriend who really isn't so bad once you get to know him.",
  "Prescription pain killers.", "Swooping.", "Mansplaining.", "A homoerotic volleyball montage.",
  "Putting things where they go.", "Holding a pepper grinder for some reason.", "Giving birth in prison.",
  "An old guy who's almost dead.", "Kanye West.", "Hot cheese.", "Getting serial killed.",
  "Seven dead and three in critical condition.", "Smegma.", "Alcoholism.", "A middle-aged man on roller skates.",
  "Nobody giving a shit about anything anymore.", "Grabbing my man by his love handles and fucking his big ass.", "Stuffing my peehole with Tic Tacs.", "Self-loathing.",
  "Sitting on my face and telling me I'm garbage.", "Half-assed foreplay.", "The Holy Bible.", "German dungeon porn.",
  "Being on fire.", "Using comedy as a coping mechanism.", "Gandhi.", "Your weird brother.",
  "Birth control.", "Nasty shit, like real sick stuff.", "An erection that lasts longer than four hours.", "A three-way with my wife and Shaquille O'Neal.",
  "The past.", "My genitals.", "An endless stream of diarrhea.", "Science.",
  "Not reciprocating oral sex.", "Flightless birds.", "A good sniff.", "50,000 volts straight to the nipples.",
  "Dead birds everywhere.", "The arrival of the pizza.", "Permanent Orgasm-Face Disorder.",
  "Irritable bowel syndrome.", "Oprah.", "Wondering if it's possible to get some of that salsa to go.",
  "Bananas.", "Cringe.", "Me jubbly bubblies.", "Peeing a little bit.", "Wet dreams.", "The Jews.", "Powerful thighs.", "These hoes.", "The only gay person in a hundred miles.", "Having sex for the first time.",
  "Donald J. Trump.", "Kissing grandma on the forehead and turning off her life support.", "A certain je ne sais quoi.", "An AR-15 assault rifle.",
  "My good bra.", "Punching a congressman in the face.", "Saying everything is okay when everything is clearly not okay.", "Being rich.",
  "Floating down the Hudson River with the other garbage.", "Republicans.", "Sniffing and kissing my feet.", "A much younger woman.",
  "Poverty.", "A loser like you.",
  "A mistake.", "Squirting.", "Wizard music.", "Explaining the difference between sex and gender.", "Free samples.", "Hurting those closest to me.", "Feeding strawberries to my manslut.",
  "Lactation.", "Laughing over champagne flutes while the poor freeze to death outside.", "Shutting up so I can watch the game.",
  "Eating a hard boiled egg out of my husband's asshole.", "One titty hanging out.", "Fucking all my dad's friends.",
  "Drinking gasoline to see what it tastes like.", "Inappropriate yodeling.", "Puberty.", "Ghosts.",
  "50 mg of Zoloft daily.", "Fucking my sister.", "Braiding three penises into a Twizzler.", "Vigorous jazz hands.",
  "Getting fingered.", "My Uber driver, Pavel.", "Police brutality.",
  "An abortion.", "Preteens.", "My fat daughter.", "Clean drinking water.",
  "Fading away into nothingness.", "Darth Vader.", "A sad handjob.", "Exactly what you'd expect.",
  "Adderall.", "Your mom.", "Sideboob.",
  "An octopus giving seven handjobs and smoking a cigarette.", "My neck, my back, my pussy, and my crack.", "Mouth herpes.",
  "Sperm whales.", "Women of color.", "Men discussing their feelings in an emotionally healthy way.", "Incest.",
  "Pac-Man uncontrollably guzzling cum.", "Casually suggesting a threesome.", "Running out of semen.", "God.",
  "Backing over a kid with the Buick.", "Pissing in my thirsty mouth.", "Emotions.", "Licking things to claim them as your own.",
  "Jobs.", "The placenta.", "Lips that could suck the chrome off a doorknob.", "The Bachelorette season finale.",
  "Throwing grapes at a man until he loses touch with reality.", "Establishing dominance.", "Finger painting.", "Old-people smell.",
  "Getting crushed by a vending machine.", "My inner demons.", "A Super Soaker full of cat pee.", "Cuddling.", "However much weed $20 can buy.", "Battlefield amputations.", "Spaghetti? Again?",
  "A disappointing birthday party.", "Nachos for the table.", "Becoming a blueberry.",
  "A tiny horse.", "Crab.", "Selling crack to children.", "Brown people.", "Sexually active band geeks.", "Pedophiles.", "Yeast.",
  "Rectangles.", "Being fucking pathetic.", "Poor people.",
  "Only dating Asian women.", "Putting children in cages.", "Karen.", "How amazing it is to be on mushrooms.",
  "Judging everyone.", "Getting married, having a few kids, buying some stuff, retiring to Florida, and dying.", "Some god damn peace and quiet.",
  "AIDS.", "Pictures of boobs.", "Strong female characters.", "Getting decapitated by a helicopter.",
  "Hospice care.", "Getting really high.", "The opioid epidemic.", "Penis envy.",
  "Gay conversion therapy.", "Burgers and pussy.", "Smelling of cum.", "The KKK.",
  "A pangender octopus who roams the cosmos in search of love.", "Meth.", "Cyanide.", "Holding down a child and farting all over him.",
  "A Bop It.", "A whole thing of butter.", "Still being a virgin.", "Solving problems with violence.",
  "Getting cummed on.", "Pixelated bukkake.", "A lifetime of sadness.", "A non-disclosure agreement.",
  "Dick pics.", "Racism.", "Menstrual rage.", "Sunshine and rainbows.",
  "Joe Biden.", "Three ounces of clean urine.", "Doing drugs with my kids.", "My gay best friend.",
  "A gossamer stream of jizz that catches the light as it arcs through the morning air.", "Executing a hostage every hour.", "The rhythms of Africa.", "Breaking out into song and dance.",
  "Leprosy.", "Gloryholes.", "Nipple blades.", "The heart of a child.",
  "Puppies!", "Fellowship in Christ.", "My wife having sex with your wife.", "Waking up half-naked in a Denny's parking lot.",
  "An older woman who knows her way around the penis.", "Getting drugs off the street and into my body.", "Daniel Radcliffe's delicious asshole.", "Active listening.",
  "Ethnic cleansing.", "Itchy pussy.", "Blowing my boyfriend so hard he shits.", "A fuck-ton of almonds.",
  "A cis man playing a trans woman.", "Waiting till marriage.", "NFTs.", "Pretending to be a dentist.",
  "The Devil himself.", "Salvation.", "Erectile dysfunction.", "My collection of Japanese sex toys.",
  "The Pope.", "White people.", "Tentacle porn.", "My bright pink fuckhole.",
  "How far I can get my own penis up my butt.", "Having anuses for eyes.", "Two Xanax and a bottle of wine.", "My pet scorpion, Tina.",
  "Danny DeVito.", "The magic of live theatre.", "Throwing a virgin into a volcano.", "Dwayne 'The Rock' Johnson.",
  "Accepting the way things are.", "Listening to her problems without trying to solve them.", "Therapy.",
  "Being fat and stupid.", "Pooping back and forth. Forever.", "Tearing that ass up like wrapping paper on Christmas morning.", "More elephant cock than I bargained for.",
  "A salty surprise.", "The South.", "The violation of our most basic human rights.", "Saudi oil money.",
  "Consensual sex.", "Telling a shitty story that goes nowhere.", "A good, strong gorilla.", "Seeing my father cry.",
  "Necrophilia.", "Being a woman.", "Getting into a pretty bad car accident.", "Black people.", "Prostate stimulation.", "Bitches.",
  "Heartwarming orphans.", "A bowl of mayonnaise and human teeth.", "Fiery poops.", "Saying 'I love you.'", "Inserting a Mason jar into my anus.",
  "The true meaning of Christmas.", "Whatever's in the fridge.", "Owning and operating a Chili's franchise.", "Estrogen.",
  "Girls.", "The Russians.", "A bleached asshole.", "Fucking the weatherman on live television.",
  "PTSD.", "Dark and mysterious forces beyond our control.", "Smallpox blankets.", "Masturbating.",
  "Hobos.", "Queefing.", "Cardi B.",
  "Viagra.", "Soup that is too hot.", "The ugliest boy in town.", "Explaining how vaginas work.",
  "Academy Award winner Meryl Streep.", "Drinking alone.", "Dick fingers.", "Multiple stab wounds.",
  "The death penalty.", "A supportive touch on the lower back.", "Anal beads.", "Slaughtering innocent civilians.",
  "Pulling out.", "Being able to talk to elephants.", "Horse meat.", "A really cool hat.",
  "Stalin.", "A stray pube.", "Worshipping that pussy.", "Completely unwarranted confidence.",
  "Doin' it in the butt.", "My ex-wife.", "Tiny tits that say 'Yippee!' when you touch them.", "Touching a pug right on his penis.",
  "A windmill full of corpses.", "The whole enchilada.", "Vladimir Putin.", "The Patriarchy.",
  "The glass ceiling.", "Vomiting seafood and bleeding anally.", "The American Dream.", "Not wearing pants.",
  "My balls on your face.", "Pooping in a laptop and closing it.", "Foreskin.",
  "Getting crushed between Serena Williams' thighs.", "Italians.", "A fetus.", "Firing a rifle into the air while balls deep in a squealing hog.",
  "Natural gas.", "Toxic masculinity.", "My relationship status.",
  "An unwanted pregnancy.", "Marvel.", "My boss.", "Bees?",
  "Harry Potter erotica.", "Giving birth to the Antichrist.", "Three dicks at the same time.", "Nazis.",
  "8 oz. of Mexican black-tar heroin.", "What that mouth do.", "Dead parents.", "Object permanence.",
  "Opposable thumbs.", "The Great Depression.", "Chainsaws for hands.",
  "Nicolas Cage.", "Like, whatever.", "Explosions.", "Not vaccinating my children because I am stupid.",
  "Our dildo.", "Huffing spray paint.", "A man on the brink of orgasm.", "Using a condom.",
  "Invading Poland.", "My vagina.", "Assless chaps.", "Murder.",
  "Sipping kombucha like a smug piece of shit.", "Her Majesty, Queen Elizabeth II.", "Black Jesus.", "Memes.",
  "Sex with animals.", "Being marginalized.", "Goblins.", "Hope.",
  "Liberals.", "A micropenis.", "Committing treason.", "A ball of earwax, semen, and toenail clippings.",
  "A horde of Vikings.", "Hot people.", "Seething with quiet resentment.", "An Oedipus complex.",
  "Geese.", "Extremely tight pants.", "Fox News.", "A little boy who won't shut the fuck up about dinosaurs.",
  "Vehicular manslaughter.", "Women's suffrage.", "Some guy.",
  "Barack Obama.",
  "The female orgasm.", "Heteronormativity.",
  "The wifi password.", "A time-traveling Chinese general from the Shang Dynasty.",
  "A mopey zoo lion.", "Pro-life protesters.", "Poor life choices.",
  "My sex life.", "Auschwitz.", "Cocaine for lunch.", "All the dudes I've fucked.",
  "The clitoris.", "The Big Bang.", "Land mines.", "The entire Mormon Tabernacle Choir.",
  "A micropig wearing a tiny raincoat and booties.", "Penis breath.", "A gambling problem.", "Man meat.",
  "Me time.", "Lumberjack fantasies.", "Goat.", "Women in yogurt commercials.", "Literally begging to die.",
  "Being a motherfucking sorcerer.", "My Black ass.", "Genuine human connection.", "Announcing that I am about to cum.",
  "Balls.", "Grandma.", "Friction.", "Applying topical ointment to my grandfather's infected penis.",
  "Farting and walking away.", "Being a dick to children.", "One trillion dollars.", "Drowning the kids in the bathtub.",
  "Dying.", "Drinking out of the toilet and eating garbage.", "The gays.", "The screams... the terrible screams.",
  "Men.", "The bombing of Nagasaki.", "Fake tits.", "The Amish.",
  "My ugly face and bad personality.", "A bitch slap.", "A brain tumor.",
  "Giggling like an anime girl.", "Swamp ass.", "The milkman.", "Cards Against Humanity.",
  "An unsolicited LinkedIn connection.", "A passive-aggressive out-of-office reply.", "Pretending to understand the blockchain.", "A mandatory team-building exercise.",
  "Being voluntold.", "Reply-all emails.", "An open-plan office.", "Hot-desking.",
  "The Sunday scaries.", "Quiet quitting.", "Death by PowerPoint.", "A performance review that says 'meets expectations'.",
  "An iPad as a babysitter.", "A toddler in a restaurant.", "Explaining TikTok to your parents.", "Forgetting which child has football practice.",
  "A family WhatsApp group.", "Competitive Christmas cards.", "School gate gossip.", "The mum who volunteers for everything.",
  "Sleep deprivation.", "A child who won't eat anything that isn't beige.", "A dodgy knee.", "Throwing your back out putting on socks.",
  "Needing reading glasses.", "A suspicious mole.", "Remembering when music was good.", "Going to bed at 9pm and feeling great about it.",
  "Hangovers that last three days.", "Accidentally groaning when you stand up.", "A resting heart rate of concern.", "Prostate anxiety.",
  "A variable rate mortgage.", "The property ladder.", "Avocado toast as a financial strategy.", "Negative equity.",
  "Superannuation.", "A 'renovator's delight'.", "Crypto gains in 2021.", "Crypto losses in 2022.",
  "Asking your parents for a loan and calling it an early inheritance.", "A sexless marriage.", "Scheduling intimacy.", "Therapy that costs more than the problem.",
  "Forgetting your wedding anniversary.", "Tinder at 40.", "An emotional affair with a podcast host.", "A vibrator that needs charging.",
  "The algorithm.", "Doom-scrolling.", "A 30-second unskippable ad.", "Deleting Twitter and coming back three days later.",
  "A four-hour Joe Rogan episode.", "A streaming service you forgot to cancel.", "A smart home that isn't.", "Autocorrect.",
  "A Zoom call that could have been an email.", "A password you've forgotten.", "Mark Zuckerberg's soul.", "An NFT your mate won't shut up about.",
  "Brexit.", "Climate anxiety.", "A government that definitely has everything under control.", "A strongly worded letter to the council.",
  "A populist leader with great hair.", "Inflation.", "A housing crisis no one is fixing.", "A politician caught doing exactly what you'd expect.",
  "Dying alone but peacefully.", "A wellness retreat that makes things worse.", "Microdosing.", "An escape room you couldn't escape.",
  "A motivational speaker who is clearly not okay.", "Aggressive mindfulness.", "Your personality before coffee.", "Emotional unavailability.",
  "A therapist who needs a therapist.", "Functional depression.", "A midlife crisis disguised as a hobby.", "A sports car you can't afford.",
  "Learning to make sourdough during lockdown.", "Existential dread in a nice font.", "A cold plunge you regret immediately.", "A gym membership used twice.",
  "Intermittent fasting until 11am.", "A meditation app with 847 unread notifications.", "Oat milk.", "Gluten, apparently.",
  "A $14 smoothie.", "An overpriced yoga class.", "A diet that starts Monday.", "A Peloton gathering dust.",
  "A 6am flight home.", "Lost luggage.", "A Ryanair fee you didn't see coming.", "An Airbnb where the host is watching.",
  "A travel pillow that doesn't work.", "A hidden gem that's on every travel blog.", "A strongly worded TripAdvisor review.", "Unsubscribing from a newsletter seventeen times.",
  "A group chat no one mutes.", "A WhatsApp voice message that's six minutes long.", "A Facebook memory from 2009.", "A biopsy that turns out fine.",
  "Pretending to be busy.", "The mental load.", "Weaponised incompetence.", "Passive income (not passive).",
  "Not replying for three weeks and hoping it goes away.", "Telling the truth on your CV.", "Awareness without action.", "Standing desks.",
  "A performance coach who peaked in 2008.", "Screen time that would concern a doctor.", "Eating lunch at your desk again.", "An exit interview where you finally say it.",
  "Paying someone else to do something you could theoretically do yourself.", "A wine subscription that got out of hand.", "Knowing all the words to an embarrassing song.", "Getting emotional at a supermarket ad.",
  "Pretending the meeting ran long.", "A child asking questions you can't answer.", "Googling your own symptoms.", "A group of middle-aged men in lycra.",
  "A Bunnings sausage sizzle.", "Negative gearing.", "A tradie who doesn't call back.", "The gap fee.",
  "Bulk billing that no longer exists.", "A $2.3 million two-bedroom in Glebe.", "Stamp duty.", "HECS debt that never seems to shrink.",
  "The RBA raising rates again.", "A sky-high electricity bill.", "Vegemite on toast.", "A Tim Tam slam.",
  "The Bunnings car park on a Saturday.", "An AFL grand final that goes to extra time.", "A Bali holiday.", "Thongs and a slab of VB.",
  "A meat pie at the footy.", "The Great Barrier Reef, while it lasts.", "A redback in the dunny.", "A funnel web in the garage.",
  "Bushfire season.", "The NBN.", "A Telstra outage.", "Foxtel, somehow still existing.",
  "The Block contestants.", "Married at First Sight.", "A Current Affair doing an exposé.", "Scott Morrison's Hawaiian holiday.",
  "Peter Dutton's resting face.", "Pauline Hanson's latest concern.", "Anthony Albanese's jazz hands.", "Robodebt.",
  "Centrelink hold music.", "The ATO data-matching program.", "A real estate agent with a passion for property.", "An underquoted auction.",
  "The Woolworths self-checkout machine.", "The Coles-Woolworths duopoly.", "Dan Murphy's before Christmas.", "A $6 flat white.",
  "Melbourne weather in one day.", "A Sydney morning commute.", "Childcare gap fees.", "A three-month wait to see a GP.",
  "Private health insurance that covers nothing.", "A rogue magpie.", "Slip, slop, slap anxiety.", "A suspicious skin check.",
  "Queensland in January.", "Adelaide's secret charm.", "Perth's sense of geographic isolation.", "Darwin's unhinged energy.",
  "A FIFO worker's second family.", "Mining money.", "Franking credits.", "The school drop-off zone.",
  "A parents and citizens committee that takes itself too seriously.", "A $180 Uber from the airport.", "A rogue kangaroo on the highway.", "The tradie who finally called back six months later.",
  "A $900 plumber for 20 minutes of work.", "Smashed avo that started the housing crisis.", "The Voice referendum small talk.", "A sausage sizzle outside every Bunnings.",
  "The Murray-Darling Basin.", "A domain.com.au price guide that means nothing.", "A Queensland politician who means well.", "Backpacker fruit pickers.",
  "A council that takes nine months to approve a deck.", "Mortgage stress disguised as a renovation.", "Kayo Sports buffering.", "The Big Australia debate.",
  "A landlord who says 'it's just business'.", "Regional Australia's opinion of Sydney.", "Sydney's opinion of Melbourne.", "Melbourne's opinion of itself.",
  "A speed camera you didn't see.", "An Aldi that opened near a Woolworths.", "The supermarket loyalty scheme that isn't loyal.", "A $40 parking fine that costs $200 to dispute.",
  "A $22 acai bowl.", "The Hemsworth brothers.", "A cacao ceremony.", "A sound bath that changed everything.",
  "A crystal that aligns your chakras.", "The Byron Bay bubble.", "A breathwork facilitator.", "Kombucha on tap.",
  "A van dweller on Belongil Beach.", "Splendour in the Grass mud.", "The Byron Bay Facebook community group.", "An anti-development petition.",
  "A wellness influencer who definitely does drugs.", "Moving to Byron for the vibe and working three jobs.", "A sunrise yoga class at The Pass.", "The Byron Bay lighthouse at dawn.",
  "Nimbin.", "A Bondi landlord.", "The Bondi to Coogee walk on a Sunday.", "A $4 million terrace in Paddington.",
  "A Surry Hills café with a 45-minute wait.", "The North Shore private school network.", "A Double Bay lunch that costs more than a flight.", "WestConnex.",
  "Sydney's train delays.", "An Opal card that doesn't tap on.", "A Manly ferry on a Friday afternoon.", "Parking anywhere near Bondi.",
  "A Sydney property developer with council connections.", "The 2000 Olympics, brought up unprompted.", "Moving to the Northern Beaches and slowly disappearing.", "Bluesfest lineup disappointment.",
  "A Nimbin local with strong opinions.", "A Byron Bay sound healer named something like River.", "The Eastern Suburbs bubble.", "A $14 green juice that fixed nothing.",
  "Selling your Surry Hills terrace and moving to Byron like everyone else.", "A breathwork circle that got weird.", "The Cape Byron lighthouse.", "An influencer doing a photoshoot at Wategos.",
  "The 'locals only' energy at The Pass.", "A Byron Bay wellness festival with a $400 ticket.", "A cold brew at Three Blue Ducks.", "That one person in Byron who knows a shaman.",
  "A Newtown sharehouse meeting about the dishes.", "The St Vincent's emergency waiting room.", "A rooftop bar in Surry Hills that's somehow always full.", "A Pyrmont apartment with harbour views and no parking.",
  "The Northern Beaches ferry that makes you feel like you're on holiday.", "A Chatswood family with strong opinions about schools.", "Paying $9 to cross the Harbour Bridge.", "A Byron Bay farmer's market with $30 cheese.",
];

const HAND_SIZE = 7;
const POLL_MS = 2500;
const WIN_SCORE = 8;

const shuffle = arr => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const genId = () => Math.random().toString(36).slice(2, 11) + Date.now().toString(36);
const genCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const loadRoom = async code => {
  const res = await fetch(`/api/room/${code}`);
  if (!res.ok) return null;
  return res.json();
};

const saveRoom = async (code, state) => {
  await fetch(`/api/room/${code}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(state),
  });
};

const parseBlanks = (text, cards = []) => {
  const parts = text.split('___');
  const result = [];
  parts.forEach((part, i) => {
    if (part) result.push({ t: 'text', v: part });
    if (i < parts.length - 1) {
      const card = cards[i];
      result.push(card ? { t: 'fill', v: card.replace(/\.$/, '') } : { t: 'blank' });
    }
  });
  return result;
};

function BlackCard({ text, pick, filled = [] }) {
  const parts = parseBlanks(text, filled);
  return (
    <div className="black-card card-shadow fade-up">
      <div className="card-label">CARDS AGAINST HUMANITY</div>
      <p className="black-card-text">
        {parts.map((p, i) =>
          p.t === 'text' ? <span key={i}>{p.v}</span> :
          p.t === 'fill' ? <span key={i} className="blank-filled">{p.v}</span> :
                           <span key={i} className="blank-empty">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        )}
      </p>
      {pick > 1 && <div className="pick-badge">PICK {pick}</div>}
      <style jsx>{`
        .black-card { background:#111; border:2px solid #2a2a2a; border-radius:16px; padding:20px 20px 16px; width:100%; max-width:360px; margin:0 auto; }
        .card-label { font-size:10px; color:#444; font-weight:700; letter-spacing:2px; margin-bottom:10px; }
        .black-card-text { color:#fff; font-size:20px; font-weight:700; line-height:1.35; margin:0 0 16px; }
        .blank-filled { border-bottom:2px solid #fff; display:inline-block; margin-bottom:-2px; color:#fff; font-style:italic; }
        .blank-empty  { border-bottom:2px solid #444; display:inline-block; margin-bottom:-2px; }
        .pick-badge   { display:inline-flex; align-items:center; background:#fff; border-radius:20px; padding:3px 12px; font-size:11px; font-weight:700; color:#000; }
      `}</style>
    </div>
  );
}

function WhiteBtn({ text, selected, order, onClick }) {
  return (
    <button onClick={onClick} className={`white-btn btn-press ${selected ? 'sel' : ''}`}>
      {selected && order !== undefined && <span className="order-badge">{order + 1}</span>}
      {text}
      <style jsx>{`
        .white-btn { width:100%; text-align:left; padding:14px 16px; border-radius:12px; border:2px solid #222; background:#111; color:#bbb; font-weight:700; font-size:15px; cursor:pointer; position:relative; transition:border-color .15s, background .15s, color .15s; font-family:inherit; }
        .white-btn.sel { background:#fff; color:#000; border-color:#fff; }
        .order-badge { position:absolute; top:8px; right:10px; background:#000; color:#fff; border-radius:50%; width:20px; height:20px; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; }
      `}</style>
    </button>
  );
}

function Scoreboard({ players, czarId, myId }) {
  const sorted = [...players].sort((a, b) => b.score - a.score);
  return (
    <div className="scoreboard">
      <div className="sb-label">SCORES · FIRST TO {WIN_SCORE}</div>
      {sorted.map((p, i) => (
        <div key={p.id} className="sb-row" style={{ borderBottom: i < sorted.length - 1 ? '1px solid #1a1a1a' : 'none' }}>
          <div className="sb-left">
            <div className="sb-avatar">{p.name[0].toUpperCase()}</div>
            <span className="sb-name" style={{ color: p.id === myId ? '#fff' : '#888', fontWeight: p.id === myId ? 700 : 500 }}>
              {p.name}{p.id === myId ? ' · you' : ''}{p.id === czarId ? ' 👑' : ''}
            </span>
          </div>
          <div className="sb-score bebas">{p.score}</div>
        </div>
      ))}
      <style jsx>{`
        .scoreboard { background:#111; border:1px solid #1e1e1e; border-radius:14px; padding:16px; }
        .sb-label { font-size:10px; color:#444; font-weight:700; letter-spacing:2px; margin-bottom:12px; }
        .sb-row { display:flex; justify-content:space-between; align-items:center; padding:8px 0; }
        .sb-left { display:flex; align-items:center; gap:10px; }
        .sb-avatar { width:28px; height:28px; border-radius:50%; background:#1e1e1e; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:700; color:#666; flex-shrink:0; }
        .sb-name { font-size:14px; }
        .sb-score { font-size:24px; color:#fff; letter-spacing:1px; }
      `}</style>
    </div>
  );
}

function Btn({ children, onClick, variant = 'primary', disabled, style: s }) {
  return (
    <button onClick={!disabled ? onClick : undefined} className={`app-btn btn-press v-${variant}`} disabled={disabled} style={s}>
      {children}
      <style jsx>{`
        .app-btn { width:100%; padding:16px 20px; border-radius:12px; font-weight:700; font-size:16px; cursor:pointer; border:none; transition:transform .1s; font-family:inherit; }
        .app-btn:disabled { opacity:0.4; cursor:not-allowed; }
        .v-primary   { background:#fff; color:#000; }
        .v-secondary { background:#1a1a1a; color:#fff; border:1px solid #2a2a2a; }
      `}</style>
    </button>
  );
}

function Inp({ placeholder, value, onChange, style: s, ...rest }) {
  return (
    <input placeholder={placeholder} value={value} onChange={onChange}
      style={{ width:'100%', padding:'14px 16px', borderRadius:12, border:'1px solid #2a2a2a', background:'#111', color:'#fff', fontSize:16, fontFamily:'Inter, sans-serif', outline:'none', boxSizing:'border-box', ...s }}
      {...rest} />
  );
}

const page = { minHeight:'100vh', background:'#0a0a0a', color:'#fff', display:'flex', flexDirection:'column', alignItems:'center', padding:'24px 16px', maxWidth:480, margin:'0 auto' };

export default function Home() {
  const [myId] = useState(genId);
  const [screen, setScreen] = useState('home');
  const [myName, setMyName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [gs, setGs] = useState(null);
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [jokerText, setJokerText] = useState('');
  const [showJokerInput, setShowJokerInput] = useState(false);
  const pollRef = useRef(null);

  useEffect(() => {
    if ((screen === 'lobby' || screen === 'game') && roomCode) {
      const poll = async () => {
        const state = await loadRoom(roomCode);
        if (state) {
          setGs(state);
          if (state.phase === 'lobby' && screen === 'game') setScreen('lobby');
          if (state.phase !== 'lobby' && screen === 'lobby') setScreen('game');
        }
      };
      poll();
      pollRef.current = setInterval(poll, POLL_MS);
      return () => clearInterval(pollRef.current);
    }
  }, [screen, roomCode]);

  const createRoom = async () => {
    if (!myName.trim()) return setError('Enter your name!');
    setLoading(true); setError('');
    const code = genCode();
    const state = {
      phase:'lobby', players:[{ id:myId, name:myName.trim(), score:0 }],
      hostId:myId, czarIndex:0, currentBlackCard:null,
      playerHands:{}, submissions:{}, submissionOrder:[], winner:null,
      blackDeck:shuffle([...Array(BLACK_CARDS.length).keys()]),
      whiteDeck:shuffle([...Array(WHITE_CARDS.length).keys()]),
      blackPos:0, whitePos:0, jokerUsed:{}, jokerSubmissions:{},
    };
    await saveRoom(code, state);
    setRoomCode(code); setGs(state); setScreen('lobby');
    setLoading(false);
  };

  const joinRoom = async () => {
    if (!myName.trim()) return setError('Enter your name!');
    if (!joinCode.trim()) return setError('Enter a room code!');
    setLoading(true); setError('');
    const code = joinCode.trim().toUpperCase();
    const state = await loadRoom(code);
    if (!state) { setLoading(false); return setError('Room not found'); }
    if (state.phase !== 'lobby') { setLoading(false); return setError('Game already started'); }
    if (state.players.find(p => p.name.toLowerCase() === myName.trim().toLowerCase())) {
      setLoading(false); return setError('That name is already taken in this room');
    }
    state.players.push({ id:myId, name:myName.trim(), score:0 });
    await saveRoom(code, state);
    setRoomCode(code); setGs(state); setScreen('lobby');
    setLoading(false);
  };

  const startGame = async () => {
    setError('');
    const state = await loadRoom(roomCode);
    if (!state) return;
    if (state.players.length < 2) return setError('Need at least 2 players!');
    setLoading(true);
    let pos = state.whitePos;
    const playerHands = {};
    for (const p of state.players) {
      playerHands[p.id] = [];
      for (let i = 0; i < HAND_SIZE; i++) {
        playerHands[p.id].push(WHITE_CARDS[state.whiteDeck[pos % state.whiteDeck.length]]);
        pos++;
      }
    }
    const czar = state.players[0];
    const blackCard = BLACK_CARDS[state.blackDeck[0]];
    const nonCzarIds = state.players.filter(p => p.id !== czar.id).map(p => p.id);
    const newState = { ...state, phase:'picking', playerHands, whitePos:pos, blackPos:1, currentBlackCard:blackCard, czarIndex:0, submissionOrder:shuffle(nonCzarIds), submissions:{}, winner:null };
    await saveRoom(roomCode, newState);
    setGs(newState); setScreen('game'); setLoading(false);
  };

  const submitCards = async () => {
    const pick = gs?.currentBlackCard?.pick || 1;
    if (selected.length !== pick || loading) return;
    setLoading(true);
    const state = await loadRoom(roomCode);
    if (!state) { setLoading(false); return; }
    const hand = state.playerHands[myId] || [];
    const submittedTexts = selected.map(idx => hand[idx]);
    state.submissions[myId] = submittedTexts;
    const newHand = [...hand];
    [...selected].sort((a,b) => b-a).forEach(idx => newHand.splice(idx,1));
    state.playerHands[myId] = newHand;
    const czar = state.players[state.czarIndex % state.players.length];
    const nonCzars = state.players.filter(p => p.id !== czar.id);
    if (nonCzars.every(p => state.submissions[p.id])) state.phase = 'judging';
    await saveRoom(roomCode, state);
    setGs(state); setSelected([]); setLoading(false);
  };

  const forceJudging = async () => {
    const state = await loadRoom(roomCode);
    if (!state || Object.keys(state.submissions).length === 0) return setError('Nobody has played yet!');
    state.phase = 'judging';
    await saveRoom(roomCode, state); setGs(state);
  };

  const submitJoker = async () => {
    if (!jokerText.trim() || loading) return;
    setLoading(true);
    const state = await loadRoom(roomCode);
    if (!state) { setLoading(false); return; }
    const used = state.jokerUsed?.[myId] || 0;
    if (used >= 3) { setLoading(false); return; }
    state.submissions[myId] = [jokerText.trim()];
    state.jokerUsed = { ...state.jokerUsed, [myId]: used + 1 };
    state.jokerSubmissions = { ...state.jokerSubmissions, [myId]: true };
    const czar = state.players[state.czarIndex % state.players.length];
    const nonCzars = state.players.filter(p => p.id !== czar.id);
    if (nonCzars.every(p => state.submissions[p.id])) state.phase = 'judging';
    await saveRoom(roomCode, state);
    setGs(state); setSelected([]); setJokerText(''); setShowJokerInput(false); setLoading(false);
  };

  const pickWinner = async (winnerId) => {
    if (loading) return;
    setLoading(true);
    const state = await loadRoom(roomCode);
    if (!state) { setLoading(false); return; }
    const winner = state.players.find(p => p.id === winnerId);
    if (!winner) { setLoading(false); return; }
    const isJoker = !!(state.jokerSubmissions?.[winnerId]);
    state.players.find(p => p.id === winnerId).score += isJoker ? 2 : 1;
    state.phase = 'winner';
    state.winner = { id:winnerId, name:winner.name, cards:state.submissions[winnerId], isJoker };
    await saveRoom(roomCode, state); setGs(state); setLoading(false);
  };

  const nextRound = async () => {
    if (loading) return;
    setLoading(true);
    const state = await loadRoom(roomCode);
    if (!state) { setLoading(false); return; }
    if (state.players.some(p => p.score >= WIN_SCORE)) {
      state.phase = 'gameover';
      await saveRoom(roomCode, state); setGs(state); setLoading(false); return;
    }
    const newCzarIdx = (state.czarIndex + 1) % state.players.length;
    const newCzar = state.players[newCzarIdx];
    let pos = state.whitePos;
    for (const p of state.players) {
      const h = [...(state.playerHands[p.id] || [])];
      while (h.length < HAND_SIZE) { h.push(WHITE_CARDS[state.whiteDeck[pos % state.whiteDeck.length]]); pos++; }
      state.playerHands[p.id] = h;
    }
    const blackCard = BLACK_CARDS[state.blackDeck[state.blackPos % state.blackDeck.length]];
    const nonCzarIds = state.players.filter(p => p.id !== newCzar.id).map(p => p.id);
    const newState = { ...state, phase:'picking', czarIndex:newCzarIdx, currentBlackCard:blackCard, blackPos:state.blackPos+1, whitePos:pos, submissions:{}, submissionOrder:shuffle(nonCzarIds), winner:null, jokerSubmissions:{} };
    await saveRoom(roomCode, newState); setGs(newState); setSelected([]); setLoading(false);
  };

  const resetGame = async () => {
    const state = await loadRoom(roomCode);
    if (!state) return;
    const newState = { ...state, phase:'lobby', players:state.players.map(p => ({ ...p, score:0 })), blackDeck:shuffle([...Array(BLACK_CARDS.length).keys()]), whiteDeck:shuffle([...Array(WHITE_CARDS.length).keys()]), blackPos:0, whitePos:0, playerHands:{}, submissions:{}, winner:null, czarIndex:0, jokerUsed:{}, jokerSubmissions:{} };
    await saveRoom(roomCode, newState); setGs(newState); setScreen('lobby');
  };

  const copyCode = () => {
    navigator.clipboard?.writeText(roomCode).catch(() => {});
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const czar = gs ? gs.players[gs.czarIndex % gs.players.length] : null;
  const isCzar = czar?.id === myId;
  const myHand = gs?.playerHands?.[myId] || [];
  const hasSubmitted = !!gs?.submissions?.[myId];
  const nonCzarCount = gs ? gs.players.filter(p => p.id !== czar?.id).length : 0;
  const submittedCount = gs ? Object.keys(gs.submissions).length : 0;
  const pick = gs?.currentBlackCard?.pick || 1;
  const myJokerUsed = gs?.jokerUsed?.[myId] || 0;
  const jokersLeft = 3 - myJokerUsed;

  const toggleCard = idx => {
    setSelected(prev => {
      if (prev.includes(idx)) return prev.filter(i => i !== idx);
      if (prev.length >= pick) return [...prev.slice(-(pick-1)), idx];
      return [...prev, idx];
    });
  };

  if (screen === 'home') return (
    <div style={page}>
      <Head><title>Cards Against Humanity · Online</title></Head>
      <div style={{ width:'100%', flex:1, display:'flex', flexDirection:'column', justifyContent:'center' }}>
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <div className="card-shadow" style={{ display:'inline-block', background:'#fff', color:'#000', borderRadius:16, padding:'20px 28px', marginBottom:14 }}>
            <div className="bebas" style={{ fontSize:34, letterSpacing:2, lineHeight:1.1 }}>Cards Against<br />Humanity</div>
          </div>
          <div style={{ color:'#444', fontSize:13 }}>Online · No sign-up needed</div>
        </div>
        {error && <div style={{ background:'#1a0a0a', border:'1px solid #5a1a1a', borderRadius:10, padding:'12px 16px', marginBottom:16, color:'#ff6b6b', fontSize:14 }}>{error}</div>}
        <Inp placeholder="Your name" value={myName} onChange={e => { setMyName(e.target.value); setError(''); }} maxLength={20} style={{ marginBottom:12, fontSize:18, fontWeight:700 }} />
        <div style={{ marginBottom:20 }}><Btn onClick={createRoom} disabled={loading}>{loading ? 'Creating…' : '+ Create a room'}</Btn></div>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
          <div style={{ flex:1, height:1, background:'#1e1e1e' }} />
          <span style={{ color:'#333', fontSize:13 }}>or join with a code</span>
          <div style={{ flex:1, height:1, background:'#1e1e1e' }} />
        </div>
        <Inp placeholder="ROOM CODE" value={joinCode} onChange={e => { setJoinCode(e.target.value.toUpperCase()); setError(''); }} maxLength={6} style={{ marginBottom:12, textAlign:'center', letterSpacing:6, fontSize:22, fontWeight:900 }} />
        <Btn onClick={joinRoom} disabled={loading} variant="secondary">{loading ? 'Connecting…' : 'Join →'}</Btn>
      </div>
    </div>
  );

  if (screen === 'lobby') {
    const isHost = gs?.hostId === myId;
    return (
      <div style={page}>
        <Head><title>Lobby · {roomCode}</title></Head>
        <div style={{ width:'100%' }}>
          <div style={{ textAlign:'center', marginBottom:32 }}>
            <div style={{ color:'#444', fontSize:11, letterSpacing:3, marginBottom:8 }}>ROOM CODE</div>
            <div onClick={copyCode} className="btn-press bebas" style={{ cursor:'pointer', fontSize:60, letterSpacing:12, lineHeight:1, userSelect:'none' }}>{roomCode}</div>
            <div style={{ color:copied ? '#4ade80' : '#333', fontSize:13, marginTop:8 }}>{copied ? '✓ Copied!' : 'Tap to copy · Share with friends'}</div>
          </div>
          <div style={{ background:'#111', border:'1px solid #1a1a1a', borderRadius:14, padding:16, marginBottom:24 }}>
            <div style={{ fontSize:10, color:'#444', letterSpacing:2, marginBottom:12 }}>PLAYERS ({gs?.players?.length})</div>
            {gs?.players?.map(p => (
              <div key={p.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', borderBottom:'1px solid #1a1a1a' }}>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ width:32, height:32, borderRadius:'50%', background:'#1e1e1e', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:13, color:'#666' }}>{p.name[0].toUpperCase()}</div>
                  <span style={{ fontWeight:p.id===myId?700:500, color:p.id===myId?'#fff':'#888', fontSize:15 }}>
                    {p.name}{p.id===myId && <span style={{ color:'#444', fontWeight:400, fontSize:12 }}> (you)</span>}
                  </span>
                </div>
                {p.id === gs?.hostId && <span style={{ fontSize:11, color:'#f59e0b', fontWeight:700 }}>HOST</span>}
              </div>
            ))}
          </div>
          {error && <div style={{ color:'#ff6b6b', fontSize:13, marginBottom:12, textAlign:'center' }}>{error}</div>}
          {isHost
            ? <Btn onClick={startGame} disabled={loading}>{loading ? 'Starting…' : `Start game → (${gs?.players?.length} player${gs?.players?.length!==1?'s':''})`}</Btn>
            : <div className="pulse" style={{ textAlign:'center', color:'#333', fontSize:14 }}>Waiting for the host to start the game…</div>
          }
        </div>
      </div>
    );
  }

  if (screen === 'game' && gs) {
    const { phase, currentBlackCard, submissions, submissionOrder, winner: wd } = gs;

    if (phase === 'gameover') {
      const sorted = [...gs.players].sort((a,b) => b.score - a.score);
      return (
        <div style={{ ...page, justifyContent:'center' }}>
          <Head><title>Game Over!</title></Head>
          <div style={{ width:'100%', textAlign:'center' }}>
            <div style={{ fontSize:60, marginBottom:8 }}>🏆</div>
            <div className="bebas" style={{ fontSize:50, letterSpacing:2 }}>{sorted[0].name} wins!</div>
            <div style={{ color:'#555', marginBottom:28 }}>{sorted[0].score} glorious points</div>
            <Scoreboard players={gs.players} czarId={czar?.id} myId={myId} />
            {gs.hostId === myId
              ? <div style={{ marginTop:20 }}><Btn onClick={resetGame}>Play again</Btn></div>
              : <div style={{ color:'#444', marginTop:20, fontSize:14 }}>Waiting for the host to restart…</div>
            }
          </div>
        </div>
      );
    }

    if (phase === 'winner') return (
      <div style={page}>
        <Head><title>Round Winner!</title></Head>
        <div style={{ width:'100%' }}>
          <div style={{ textAlign:'center', marginBottom:18 }}>
            <div style={{ fontSize:44, marginBottom:4 }}>{wd.isJoker ? '✨' : '🎉'}</div>
            <div className="bebas" style={{ fontSize:38, letterSpacing:1 }}>{wd.name} wins the round!</div>
            {wd.isJoker && (
              <div style={{ display:'inline-block', background:'#a855f7', color:'#fff', borderRadius:20, padding:'4px 14px', fontSize:12, fontWeight:700, marginTop:6, letterSpacing:1 }}>
                ✨ CUSTOM CARD · +2 POINTS
              </div>
            )}
          </div>
          <BlackCard text={currentBlackCard.text} pick={currentBlackCard.pick} filled={wd.cards} />
          <div style={{ margin:'14px 0 18px' }}>
            {wd.cards.map((c,i) => <div key={i} className="card-shadow" style={{ background: wd.isJoker ? '#f3e8ff' : '#fff', color:'#000', borderRadius:12, padding:'12px 16px', fontWeight:700, fontSize:16, marginBottom:8, border: wd.isJoker ? '2px solid #a855f7' : 'none' }}>{c}</div>)}
          </div>
          <Scoreboard players={gs.players} czarId={czar?.id} myId={myId} />
          <div style={{ marginTop:20 }}>
            {isCzar
              ? <Btn onClick={nextRound} disabled={loading}>{loading ? 'Loading…' : 'Next round →'}</Btn>
              : <div className="pulse" style={{ textAlign:'center', color:'#333', fontSize:14 }}>Waiting for {czar?.name} to start the next round…</div>
            }
          </div>
        </div>
      </div>
    );

    if (phase === 'judging') {
      if (!isCzar) return (
        <div style={{ ...page, justifyContent:'center' }}>
          <div style={{ fontSize:52, marginBottom:12 }}>⚖️</div>
          <div className="bebas" style={{ fontSize:34, textAlign:'center' }}>{czar?.name} is judging…</div>
          <div style={{ color:'#444', marginTop:8 }}>Sit tight!</div>
        </div>
      );
      const orderedSubs = (submissionOrder||[]).filter(pid => submissions[pid]).map((pid,i) => ({ pid, cards:submissions[pid], num:i+1, isJoker: !!(gs.jokerSubmissions?.[pid]) }));
      return (
        <div style={page}>
          <div style={{ width:'100%' }}>
            <div style={{ background:'#f59e0b', color:'#000', borderRadius:10, padding:'8px 16px', textAlign:'center', fontWeight:700, fontSize:13, marginBottom:16 }}>
              👑 You are the Card Czar — pick your favorite!
            </div>
            <BlackCard text={currentBlackCard.text} pick={pick} />
            <div style={{ marginTop:18, display:'flex', flexDirection:'column', gap:12, paddingBottom:24 }}>
              {orderedSubs.map(sub => (
                <button key={sub.pid} onClick={() => !loading && pickWinner(sub.pid)} className="btn-press card-shadow"
                  style={{ background:'#fff', color:'#000', borderRadius:14, padding:'16px 18px', textAlign:'left', border: sub.isJoker ? '2px solid #a855f7' : 'none', cursor:'pointer' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
                    <div style={{ fontSize:11, color:'#999', fontWeight:700 }}>ANSWER {sub.num}</div>
                    {sub.isJoker && <div style={{ fontSize:10, background:'#a855f7', color:'#fff', borderRadius:10, padding:'2px 8px', fontWeight:700 }}>✨ CUSTOM</div>}
                  </div>
                  {sub.cards.map((c,j) => <div key={j} style={{ fontWeight:700, fontSize:17, marginBottom:4 }}>{c}</div>)}
                  <div style={{ marginTop:8, fontSize:13, color:'#666', lineHeight:1.4 }}>
                    {parseBlanks(currentBlackCard.text, sub.cards).map((p,k) =>
                      p.t==='text' ? <span key={k}>{p.v}</span> :
                      p.t==='fill' ? <strong key={k}>{p.v}</strong> :
                                     <em key={k} style={{ color:'#bbb' }}>___</em>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (phase === 'picking') {
      if (isCzar) return (
        <div style={page}>
          <div style={{ width:'100%' }}>
            <div style={{ background:'#f59e0b', color:'#000', borderRadius:10, padding:'8px 16px', textAlign:'center', fontWeight:700, fontSize:13, marginBottom:16 }}>
              👑 You are the Card Czar — wait for answers
            </div>
            <BlackCard text={currentBlackCard.text} pick={pick} />
            <div style={{ background:'#111', border:'1px solid #1e1e1e', borderRadius:14, padding:20, textAlign:'center', marginTop:18 }}>
              <div className="bebas" style={{ fontSize:52, letterSpacing:2 }}>{submittedCount}/{nonCzarCount}</div>
              <div style={{ color:'#555', fontSize:14 }}>players have played</div>
              {submittedCount > 0 && (
                <button onClick={forceJudging} style={{ marginTop:14, background:'transparent', border:'none', color:'#444', fontSize:12, cursor:'pointer', textDecoration:'underline' }}>
                  Force judging (skip AFK players)
                </button>
              )}
            </div>
            <div style={{ marginTop:18 }}><Scoreboard players={gs.players} czarId={czar?.id} myId={myId} /></div>
          </div>
        </div>
      );

      if (hasSubmitted) return (
        <div style={{ ...page, justifyContent:'center' }}>
          <div style={{ fontSize:52, marginBottom:12 }}>✅</div>
          <div className="bebas" style={{ fontSize:34 }}>Cards played!</div>
          <div style={{ color:'#555', marginTop:6 }}>{submittedCount}/{nonCzarCount} players ready</div>
          <div className="pulse" style={{ color:'#333', marginTop:6, fontSize:13 }}>Waiting for others…</div>
        </div>
      );

      return (
        <div style={{ ...page, padding:'16px 16px 28px' }}>
          <div style={{ width:'100%' }}>
            <BlackCard text={currentBlackCard.text} pick={pick} filled={selected.map(idx => myHand[idx])} />
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', margin:'14px 0 12px' }}>
              <div style={{ color:'#555', fontSize:13 }}>
                Pick {pick} card{pick>1?'s':''} &nbsp;·&nbsp;
                <span style={{ color:selected.length===pick?'#4ade80':'#777' }}>{selected.length}/{pick}</span>
              </div>
              <button onClick={submitCards} disabled={selected.length!==pick||loading} className="btn-press"
                style={{ background:selected.length===pick?'#fff':'#1a1a1a', color:selected.length===pick?'#000':'#444', border:'none', borderRadius:10, padding:'10px 18px', fontWeight:700, fontSize:14, cursor:selected.length===pick?'pointer':'not-allowed', fontFamily:'inherit' }}>
                {loading ? '…' : 'Play →'}
              </button>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {myHand.map((card,i) => {
                const selOrder = selected.indexOf(i);
                return <WhiteBtn key={i} text={card} selected={selOrder!==-1} order={selOrder!==-1?selOrder:undefined} onClick={() => toggleCard(i)} />;
              })}
            </div>
            {pick === 1 && jokersLeft > 0 && !showJokerInput && (
              <button onClick={() => { setShowJokerInput(true); setSelected([]); }} style={{ marginTop:16, width:'100%', padding:'14px 16px', borderRadius:12, border:'2px dashed #a855f7', background:'transparent', color:'#a855f7', fontWeight:700, fontSize:15, cursor:'pointer', fontFamily:'inherit' }}>
                ✏️ Write your own &nbsp;·&nbsp; {jokersLeft} left
              </button>
            )}
            {pick === 1 && showJokerInput && (
              <div style={{ marginTop:16, background:'#1a0a2e', border:'2px solid #a855f7', borderRadius:12, padding:16 }}>
                <div style={{ fontSize:11, color:'#a855f7', fontWeight:700, letterSpacing:1, marginBottom:10 }}>✨ CUSTOM CARD · {jokersLeft} USE{jokersLeft!==1?'S':''} LEFT</div>
                <textarea
                  placeholder="Write your answer…"
                  value={jokerText}
                  onChange={e => setJokerText(e.target.value)}
                  maxLength={120}
                  rows={3}
                  style={{ width:'100%', padding:'12px', borderRadius:8, border:'1px solid #a855f7', background:'#0d0d1a', color:'#fff', fontSize:15, fontFamily:'inherit', resize:'none', outline:'none', boxSizing:'border-box' }}
                />
                <div style={{ display:'flex', gap:8, marginTop:10 }}>
                  <button onClick={() => { setShowJokerInput(false); setJokerText(''); }} style={{ flex:1, padding:'11px', borderRadius:10, border:'1px solid #333', background:'transparent', color:'#666', fontWeight:700, fontSize:14, cursor:'pointer', fontFamily:'inherit' }}>Cancel</button>
                  <button onClick={submitJoker} disabled={!jokerText.trim()||loading} style={{ flex:2, padding:'11px', borderRadius:10, border:'none', background:jokerText.trim()?'#a855f7':'#2a1a3a', color:jokerText.trim()?'#fff':'#555', fontWeight:700, fontSize:14, cursor:jokerText.trim()?'pointer':'not-allowed', fontFamily:'inherit' }}>
                    {loading ? '…' : 'Play custom card →'}
                  </button>
                </div>
              </div>
            )}
            {pick === 1 && jokersLeft === 0 && (
              <div style={{ marginTop:16, textAlign:'center', fontSize:12, color:'#444' }}>No custom cards left</div>
            )}
          </div>
        </div>
      );
    }
  }

  return <div style={{ ...page, justifyContent:'center' }}><div className="pulse" style={{ color:'#333' }}>Loading…</div></div>;
}
