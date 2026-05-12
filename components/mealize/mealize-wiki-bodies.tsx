"use client";

import { WIKI_IMG_BASE, type WikiSlug } from "@/lib/mealize-wiki";

import { MealizeWelcomeDocsUserStories } from "./mealize-welcome-docs-user-stories";
import { WikiRemoteImg } from "./mealize-wiki-shell";

export function WikiBody({ slug }: { slug: WikiSlug | null }) {
  if (slug === null) return <WikiOverviewBody />;
  switch (slug) {
    case "covid-19-image-gallery":
      return <WikiCovidBody />;
    case "database-diagram":
      return <WikiDatabaseBody />;
    case "design-thinking":
      return <WikiDesignThinkingBody />;
    case "feature-list":
      return <WikiFeatureListBody />;
    case "google-survey":
      return <WikiGoogleSurveyBody />;
    case "prototypes":
      return <WikiPrototypesBody />;
    case "user-stories":
      return <WikiUserStoriesBody />;
    default:
      return null;
  }
}

function WikiOverviewBody() {
  return (
    <>
      <p>
        Mealize is an app that aims to reduce food scarcity and waste by connecting businesses to nonprofits.
      </p>
      <h2 className="mt-8 text-lg font-bold text-black dark:text-zinc-50">The problem</h2>
      <p>
        Before the Covid-19 pandemic, in 2019 about 10.5% of total US households reported that they had low food
        security or very low food security. (Source:{" "}
        <a href="https://www.ers.usda.gov/" target="_blank" rel="noopener noreferrer">
          Economic Research Service - U.S. Department Of Agriculture
        </a>
        )
      </p>
      <p>
        However, each year in the USA, an estimated 30-40% of food supply gets wasted. (Source:{" "}
        <a href="https://www.usda.gov/" target="_blank" rel="noopener noreferrer">
          U.S. Department Of Agriculture
        </a>
        )
      </p>
      <p>
        The Covid-19 pandemic caused 22 million job losses in the USA from February 2020 to April 2020, and the entire
        supply chain was disrupted. (Source:{" "}
        <a href="https://www.bls.gov/" target="_blank" rel="noopener noreferrer">
          US Bureau of Labor Statistics
        </a>
        )
      </p>
      <p>As a result, feeding at-risk populations in the USA has become an extremely pressing issue.</p>
      <h2 className="mt-8 text-lg font-bold text-black dark:text-zinc-50">Proposed solution</h2>
      <p>
        Create a centralized location where businesses and nonprofits can connect, communicate and set up pickup times
        for surplus food.
      </p>
      <ul className="ml-1 list-disc space-y-2 pl-5">
        <li>Nonprofit managers can post requests for items that are in high demand.</li>
        <li>Nonprofit managers can filter through their feed by category and find exactly what they need.</li>
        <li>Business managers can post pictures of surplus food.</li>
        <li>
          Business managers will not waste time attempting to deliver food to nonprofits, only to find out that the
          nonprofit will not accept their items such as bread, pasta, or refrigerated/frozen foods.
        </li>
      </ul>
      <h2 className="mt-8 text-lg font-bold text-black dark:text-zinc-50">Features</h2>
      <ul className="ml-1 list-disc space-y-2 pl-5">
        <li>Light mode, dark mode and background customization</li>
        <li>Post a request as a nonprofit manager.</li>
        <li>Post surplus food as a business manager.</li>
        <li>Add posts to favorites list.</li>
        <li>Notify managers about good items you find.</li>
        <li>Send pick up request to business owners (limited to nonprofit managers).</li>
        <li>Accept or decline pick up requests (limited to business managers).</li>
        <li>Check pending and accepted deliveries.</li>
        <li>Filter by category and search items by keywords!</li>
      </ul>
    </>
  );
}

function WikiCovidBody() {
  return (
    <>
      <h2 className="text-lg font-bold text-black dark:text-zinc-50">Food banks being overwhelmed during peak lockdown.</h2>
      <h3 className="text-base font-semibold text-black dark:text-zinc-200">Words by Reuters:</h3>
      <p>
        &quot;Saturday, April 18, 2020 Cars wait in a line to receive boxes of food at a drive-thru food distribution
        site from the Los Angeles Regional Food Bank and Los Angeles County Federation of Labor outside the Teamsters
        Local 572 office in Carson, California, April 18. REUTERS/Patrick T. Fallon&quot;{" "}
        <a href="https://www.reuters.com/" target="_blank" rel="noopener noreferrer">
          Source
        </a>
      </p>
      <WikiRemoteImg
        src={`${WIKI_IMG_BASE}/covid-19-image-gallery/1.png`}
        alt="Cars lined up for food distribution during Covid-19 lockdown"
      />
      <p>
        Food waste &quot;Coronavirus has caused mountains of food to go to waste.&quot; (Source:{" "}
        <a href="https://www.weforum.org/" target="_blank" rel="noopener noreferrer">
          World Economic Forum
        </a>
        )
      </p>
      <p className="text-xs text-black/70 dark:text-zinc-500">Image courtesy of REUTERS/Stringer</p>
      <WikiRemoteImg src={`${WIKI_IMG_BASE}/covid-19-image-gallery/2.jpg`} alt="Food waste during coronavirus pandemic" />

      <h2 className="mt-10 text-lg font-bold text-black dark:text-zinc-50">Dumping milk</h2>
      <p>
        &quot;Golden E Dairy near West Bend has been forced to dump 25,000 gallons of milk a day as the coronavirus
        pandemic slams the fragile dairy industry.&quot; (Source:{" "}
        <a href="https://www.jsonline.com/" target="_blank" rel="noopener noreferrer">
          Milwaukee Journal Sentinel
        </a>
        )
      </p>
      <p className="text-xs text-black/70 dark:text-zinc-500">Image courtesy of Golden E Dairy Farm</p>
      <WikiRemoteImg src={`${WIKI_IMG_BASE}/covid-19-image-gallery/3.png`} alt="Dairy industry milk disposal" />
      <p>
        Milk limit &quot;Despite high demand, thousands of gallons of milk is going to waste.&quot; (Source: World
        Economic Forum)
      </p>
      <p className="text-xs text-black/70 dark:text-zinc-500">Image courtesy of REUTERS/Brendan Mcdermid</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <WikiRemoteImg src={`${WIKI_IMG_BASE}/covid-19-image-gallery/4.png`} alt="Covid-19 food system context" />
        <WikiRemoteImg src={`${WIKI_IMG_BASE}/covid-19-image-gallery/5.png`} alt="Covid-19 food system context" />
      </div>
    </>
  );
}

function WikiDatabaseBody() {
  return (
    <WikiRemoteImg
      src={`${WIKI_IMG_BASE}/database-diagram/1.png`}
      alt="Mealize database entity relationship diagram"
      className="max-w-full"
    />
  );
}

function WikiDesignThinkingBody() {
  return (
    <>
      <p>
        The original app concept for Mealize was to connect poor, rural families with food banks that have a mobile fleet
        such as the Food Bank of the Rockies in Colorado. Although this was a noble idea, the implementation is too
        complex and requires a lot of staff, donations or government subsidies. As a result, I had to scale back my
        idea to serve businesses and nonprofits in cities first to see if the app will even succeed. In addition, inner
        city families definitely need help as well and unfortunately the environment that they live in is easier to
        work with than rural American communities.
      </p>
      <p>
        Slides below mirror the design process on the portfolio wiki. This method of rapid ideation, prototyping and
        redefining the problem was influenced by the{" "}
        <a
          href="https://www.interaction-design.org/literature/topics/design-thinking"
          target="_blank"
          rel="noopener noreferrer"
        >
          Interaction Design Foundation&apos;s model of Design Thinking
        </a>
        .
      </p>
      <ol className="ml-1 list-decimal space-y-3 pl-5 text-sm">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <li key={n} className="font-medium text-black dark:text-zinc-200">
            <span className="mb-2 block text-black/80 dark:text-zinc-400">Design thinking slide {n} of 6</span>
            <WikiRemoteImg
              src={`${WIKI_IMG_BASE}/design-thinking/${n}.png`}
              alt={`Design thinking slide ${n} of 6`}
            />
          </li>
        ))}
      </ol>
    </>
  );
}

function WikiFeatureListBody() {
  return (
    <>
      <h2 className="text-lg font-bold text-black dark:text-zinc-50">Nonprofits posting requests</h2>
      <ul className="ml-1 list-disc pl-5">
        <li>Create</li>
        <li>Read</li>
        <li>Update</li>
        <li>Destroy</li>
      </ul>
      <h2 className="mt-8 text-lg font-bold text-black dark:text-zinc-50">Businesses posting items</h2>
      <ul className="ml-1 list-disc pl-5">
        <li>Create</li>
        <li>Read</li>
        <li>Update</li>
        <li>Destroy</li>
      </ul>
      <h2 className="mt-8 text-lg font-bold text-black dark:text-zinc-50">Messaging</h2>
      <ul className="ml-1 list-disc pl-5">
        <li>Create</li>
        <li>Read</li>
      </ul>
      <h2 className="mt-8 text-lg font-bold text-black dark:text-zinc-50">Request for delivery</h2>
      <ul className="ml-1 list-disc pl-5">
        <li>Create</li>
        <li>Read</li>
        <li>Update</li>
        <li>Destroy</li>
      </ul>
      <h2 className="mt-8 text-lg font-bold text-black dark:text-zinc-50">Bonuses</h2>
      <h3 className="text-base font-semibold text-black dark:text-zinc-200">Calendars for nonprofits and businesses</h3>
      <ul className="ml-1 list-disc pl-5">
        <li>Create</li>
        <li>Read</li>
        <li>Update</li>
        <li>Destroy</li>
      </ul>
      <h3 className="mt-6 text-base font-semibold text-black dark:text-zinc-200">Holiday and seasonal events</h3>
      <ul className="ml-1 list-disc pl-5">
        <li>Create</li>
        <li>Read</li>
        <li>Update</li>
        <li>Destroy</li>
      </ul>
    </>
  );
}

function WikiGoogleSurveyBody() {
  return (
    <>
      <p>
        To determine the demand for food procurement services and applications, I sent surveys to food industry workers.
        This project has no funding, so the response rate is low, but I did my best to assess the relevance of this
        project by spreading out the survey over a year.
      </p>
      <p>
        Open the original page for the empathy map image and full layout. Below is the question list and anonymized
        responses preserved from the wiki.
      </p>
      <p className="font-semibold">Here is a list of all questions asked:</p>
      <ol className="ml-1 list-decimal space-y-2 pl-5">
        <li>If you have worked in the food industry, please list the name(s) of the business(es) you were employed at.</li>
        <li>Did your employer throw out surplus food, excluding consumer waste?</li>
        <li>If you answered yes to the previous question, what kind of products did your employer discard?</li>
        <li>Did your organization donate surplus food to nonprofits?</li>
        <li>If you answered &apos;Yes&apos; to the previous question, what kind of products were donated?</li>
        <li>Did your employer sell surplus food to discounted markets such as Grocery Outlet?</li>
        <li>If you answered &apos;Yes&apos; to the previous question, what kind of products were sold?</li>
        <li>Were you alarmed by the amount of surplus food at your job?</li>
        <li>Were you provided staff meals?</li>
        <li>If you answered &apos;Yes&apos; to the previous question, were staff meals made from surplus food?</li>
        <li>Were you gifted surplus food to take home?</li>
        <li>
          Do you think that restaurants and grocery stores regularly have sustainable, healthy surplus food that they are
          able to donate to nonprofits?
        </li>
      </ol>

      <details className="mt-6 rounded-xl border border-neutral-200 bg-white p-4 dark:border-white/10 dark:bg-zinc-950/50">
        <summary className="cursor-pointer text-sm font-bold text-black outline-none marker:text-[#28a690] dark:text-zinc-100">
          Survey responses from 2021
        </summary>
        <div className="mt-4 space-y-6 border-t border-neutral-100 pt-4 text-sm dark:border-white/10">
          <SurveyBlock
            n={1}
            title="If you have worked in the food industry, please list the name(s) of the business(es) you were employed at."
            answers={[
              "Actually worked in a hospital kitchen at Littleton Adventist Hospital",
              "Marriot hotel",
              "Homegrown Tap & Dough in Olde Town Arvada",
              "King Soopers",
            ]}
          />
          <SurveyBlock n={2} title="Did your employer throw out surplus food, excluding consumer waste?" answers={[]} />
          <SurveyBlock
            n={3}
            title="If you answered yes to the previous question, what kind of products did your employer discard?"
            answers={[
              "A lot of discarded food was prepared food that was leftover from the day.",
              "Meats, starches, vegetables, and desserts",
              "Mostly vegetables and salad! Healthy foods are the ones that are perishable!",
              "I honestly don't know. I just worked up front for a short time.",
            ]}
          />
          <SurveyBlock n={4} title="Did your organization donate surplus food to nonprofits?" answers={[]} />
          <SurveyBlock
            n={5}
            title="If you answered 'Yes' to the previous question, what kind of products were donated?"
            answers={["I don't know."]}
          />
          <SurveyBlock
            n={6}
            title="Did your employer sell surplus food to discounted markets such as Grocery Outlet?"
            answers={[]}
          />
          <SurveyBlock
            n={7}
            title="If you answered 'Yes' to the previous question, what kind of products were sold?"
            answers={["No responses"]}
          />
          <SurveyBlock n={8} title="Were you alarmed by the amount of surplus food at your job?" answers={[]} />
          <SurveyBlock n={9} title="Were you provided staff meals?" answers={[]} />
          <SurveyBlock
            n={10}
            title="If you answered 'Yes' to the previous question, were staff meals made from surplus food?"
            answers={[]}
          />
          <SurveyBlock n={11} title="Were you gifted surplus food to take home?" answers={[]} />
          <SurveyBlock
            n={12}
            title="Do you think that restaurants and grocery stores regularly have sustainable, healthy surplus food that they are able to donate to nonprofits?"
            answers={[
              "I haven't worked in the food industry but I have family who have worked in the grocery industry. They have commented that there is an immense amount of food that is wasted.",
              "Yes I do. Almost all food that is prepared whether in a hospital or restaurant can be donated. The biggest obstacle is the FDA and other laws that prohibit it due to sanitation/health laws, avoidance to legality issues (i.e.being sued for someone getting sick) and just plain greed.",
              "I think some do and others may toss expired food",
              "Yes",
            ]}
          />
        </div>
      </details>

      <details className="mt-4 rounded-xl border border-neutral-200 bg-white p-4 dark:border-white/10 dark:bg-zinc-950/50">
        <summary className="cursor-pointer text-sm font-bold text-black outline-none marker:text-[#28a690] dark:text-zinc-100">
          Survey responses from 2022
        </summary>
        <div className="mt-4 space-y-6 border-t border-neutral-100 pt-4 text-sm dark:border-white/10">
          <SurveyBlock
            n={1}
            title="If you have worked in the food industry, please list the name(s) of the business(es) you were employed at."
            answers={[
              "Chilis",
              "Wishbone Chicken",
              "Publix",
              "Subway",
              "Amazon test labs & Stores",
              "Pho Kim Long",
              "Jet's Pizza",
              "Istanbul FoodLovers",
              "Ox",
            ]}
          />
          <SurveyBlock n={2} title="Did your employer throw out surplus food, excluding consumer waste?" answers={[]} />
          <SurveyBlock
            n={3}
            title="If you answered yes to the previous question, what kind of products did your employer discard?"
            answers={[
              "Expired product, so anything from salsa to ranch, meat as well",
              "Noodles, Fries",
              "Deli products--fried chicken, deli meat, deli cheese, sandwiches, salads, puddings, sandwich ingredients",
              "Bread, cookies, and meat",
              "If bad or expired dates - the rest if still good would get donated to food banks & Mary's place same day for that night hand outs.",
              "Vegetables and fruits that had 'gone bad'",
              "Unused Pizza Dough",
              "Chicken and Lamb Kebabs, pita bread, yoghurt, salads",
            ]}
          />
          <SurveyBlock n={4} title="Did your organization donate surplus food to nonprofits?" answers={[]} />
          <SurveyBlock
            n={5}
            title="If you answered 'Yes' to the previous question, what kind of products were donated?"
            answers={["* Mary's Place of Seattle, WA."]}
          />
          <SurveyBlock
            n={6}
            title="Did your employer sell surplus food to discounted markets such as Grocery Outlet?"
            answers={[]}
          />
          <SurveyBlock
            n={7}
            title="If you answered 'Yes' to the previous question, what kind of products were sold?"
            answers={["No responses"]}
          />
          <SurveyBlock n={8} title="Were you alarmed by the amount of surplus food at your job?" answers={[]} />
          <SurveyBlock n={9} title="Were you provided staff meals?" answers={[]} />
          <SurveyBlock
            n={10}
            title="If you answered 'Yes' to the previous question, were staff meals made from surplus food?"
            answers={[]}
          />
          <SurveyBlock n={11} title="Were you gifted surplus food to take home?" answers={[]} />
          <SurveyBlock
            n={12}
            title="Do you think that restaurants and grocery stores regularly have sustainable, healthy surplus food that they are able to donate to nonprofits?"
            answers={[]}
          />
        </div>
      </details>
    </>
  );
}

function WikiPrototypesBody() {
  return (
    <>
      <h2 className="text-lg font-bold text-black dark:text-zinc-50">Early sketches</h2>
      <WikiRemoteImg src={`${WIKI_IMG_BASE}/prototypes/1.png`} alt="Mealize early sketch prototype" />
      <h2 className="mt-10 text-lg font-bold text-black dark:text-zinc-50">Low fidelity</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <WikiRemoteImg src={`${WIKI_IMG_BASE}/prototypes/2.webp`} alt="Mealize low fidelity prototype" />
        <WikiRemoteImg src={`${WIKI_IMG_BASE}/prototypes/3.jpg`} alt="Mealize low fidelity prototype" />
        <WikiRemoteImg src={`${WIKI_IMG_BASE}/prototypes/4.png`} alt="Mealize low fidelity prototype" />
      </div>
      <h2 className="mt-10 text-lg font-bold text-black dark:text-zinc-50">High fidelity</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <WikiRemoteImg src={`${WIKI_IMG_BASE}/prototypes/5.png`} alt="Mealize high fidelity prototype" />
        <WikiRemoteImg src={`${WIKI_IMG_BASE}/prototypes/6.png`} alt="Mealize high fidelity prototype" />
      </div>
    </>
  );
}

function WikiUserStoriesBody() {
  return <MealizeWelcomeDocsUserStories />;
}

function SurveyBlock({ n, title, answers }: { n: number; title: string; answers: string[] }) {
  return (
    <div>
      <p className="font-semibold text-black dark:text-zinc-100">
        {n}. {title}
      </p>
      {answers.length ? (
        <ul className="mt-2 ml-1 list-disc space-y-1 pl-5 text-black/90 dark:text-zinc-300">
          {answers.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-xs italic text-zinc-500">(No free-text responses captured on the wiki for this prompt.)</p>
      )}
    </div>
  );
}
