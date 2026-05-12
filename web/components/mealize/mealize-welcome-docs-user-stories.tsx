import type { ReactNode } from "react";

const p =
  "text-sm font-medium leading-relaxed text-black dark:text-zinc-300 [&_strong]:font-semibold [&_strong]:text-black dark:[&_strong]:text-zinc-200";

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold tracking-tight text-black dark:text-zinc-50">{title}</h3>
      <div className={`space-y-3 ${p}`}>{children}</div>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="ml-1 list-disc space-y-2 pl-5">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

/** In-app copy of https://www.lukeyamasaki.com/work/mealize/wiki/user-stories */
export function MealizeWelcomeDocsUserStories() {
  return (
    <div className="space-y-12">
      <Block title="User Authentication">
        <div className="space-y-8">
          <div>
            <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#156b5c] dark:text-[#9af2c0]">
              Demo
            </h4>
            <p className="mb-2">As a demo user:</p>
            <Bullets
              items={[
                "I want to login in with two clicks. One to open the log in or sign up form and one to click a demo button.",
                "I want to demo the nonprofit manager, volunteer and business manager experiences.",
                "I expect to find demo user buttons in both the log in and sign up forms.",
                "I expect to have access to all features of the website.",
                "I do not expect to be able to change user settings.",
              ]}
            />
          </div>
          <div>
            <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#156b5c] dark:text-[#9af2c0]">
              Visiting user
            </h4>
            <p className="mb-2">As an unregistered user:</p>
            <Bullets
              items={[
                "I want to be able to search and filter items and requests.",
                "I want to search for businesses and nonprofits.",
                "I want to see individual organization pages.",
              ]}
            />
          </div>
          <div>
            <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#156b5c] dark:text-[#9af2c0]">
              Sign Up
            </h4>
            <p className="mb-2">As a potential new user:</p>
            <Bullets items={["I want to be able to find the sign up form quickly in the navbar."]} />
            <p className="mt-3 font-semibold">When I click on the sign up button:</p>
            <Bullets
              items={[
                "I expect to signup via a popup or modal form.",
                "I expect to select my organization and enter my role in the nonprofit or business.",
                "I do not want to see all inputs at once. I expect to see a 'next' navigation button.",
                "I expect to see a 'X' button to clear entries and an eye icon to see passwords I enter.",
                "I expect to be redirected to the home page after successfully signing up.",
              ]}
            />
            <p className="mt-3 font-semibold">When I enter bad data on the sign up form:</p>
            <Bullets
              items={[
                "I would like the website to display descriptive errors and keep all input.",
                "I want to know why my input failed and I do not want to enter in information again.",
              ]}
            />
          </div>
          <div>
            <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#156b5c] dark:text-[#9af2c0]">
              Log In
            </h4>
            <p className="mb-2">As a logged out user:</p>
            <Bullets items={["I want to find the log in button quickly in the navbar."]} />
            <p className="mt-3 font-semibold">When I click the log in button:</p>
            <Bullets
              items={[
                "I expect the same layout of having a popup or modal form.",
                "I would like to enter my email or phone number and password on a clearly laid out form.",
                "After logging in, I just want the modal to close so that I do not get redirected elsewhere.",
              ]}
            />
            <p className="mt-3 font-semibold">When I enter invalid data on the log-in form:</p>
            <Bullets
              items={[
                "I would like the website to display descriptive errors and keep all input.",
                "I want to know exactly why my input failed and I do not want to enter in information again.",
              ]}
            />
          </div>
          <div>
            <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#156b5c] dark:text-[#9af2c0]">
              Log Out
            </h4>
            <p className="mb-2">As a logged in user:</p>
            <Bullets
              items={[
                "I expect to find the log out button within the navbar.",
                "If I cannot find the log out button fast, I will get frustrated.",
              ]}
            />
            <p className="mt-3 font-semibold">While on any page of the site:</p>
            <Bullets items={["I expect to find the log out button in the navbar."]} />
          </div>
        </div>
      </Block>

      <Block title="Items">
        <div className="space-y-8">
          <div>
            <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#156b5c] dark:text-[#9af2c0]">
              Create a new food item
            </h4>
            <p className="mb-2">As a logged in business manager:</p>
            <Bullets
              items={[
                "I expect to find a post button either in the navbar or somewhere near the top of the page.",
                "I expect to see a popup or modal form, since the log in and sign up forms were modals.",
              ]}
            />
            <p className="mt-3 font-semibold">When I&apos;m creating a new item:</p>
            <Bullets
              items={[
                "I want to create a new item post by uploading an image of leftover food.",
                "I expect to enter an expiration date and quantity.",
                "I want to preview my item before submitting it.",
              ]}
            />
            <p className="mt-3 font-semibold">When I submit:</p>
            <Bullets items={["I expect to be redirected to the news feed with my post at the very top."]} />
          </div>
        </div>
      </Block>

      <Block title="Requests">
        <div className="space-y-8">
          <div>
            <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#156b5c] dark:text-[#9af2c0]">
              Create a new request
            </h4>
            <p className="mb-2">As a logged in nonprofit manager:</p>
            <Bullets
              items={[
                "I expect to find a post button either in the navbar or somewhere near the top of the page.",
                "I expect to see a popup or modal form, since the log in and sign up forms were modals.",
              ]}
            />
            <p className="mt-3 font-semibold">When I&apos;m creating a new request:</p>
            <Bullets
              items={[
                "I want to create a new request post by Entering a short title, a description about what I'm looking for and the quantity I would like.",
                "I expect to enter an end date for the post in case it is a temporary need.",
                "I want to preview my request before submitting it.",
              ]}
            />
            <p className="mt-3 font-semibold">When I submit:</p>
            <Bullets items={["I expect to be redirected to the news feed with my request at the very top."]} />
          </div>
          <div>
            <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#156b5c] dark:text-[#9af2c0]">
              Read items and requests
            </h4>
            <p className="mb-2 font-semibold">Regardless of being logged in:</p>
            <Bullets
              items={[
                "I expect to be able to view all items and requests",
                "I expect to be able to see available, pending, completed and expired items and requests.",
                "I expect Mealize to archive all posts so that I have a good understanding of food waste in my city.",
              ]}
            />
            <p className="mt-3 font-semibold">When I&apos;m on the home page:</p>
            <Bullets
              items={[
                "I expect to view all posts and filter them by favorites, availability, type and organization.",
              ]}
            />
            <p className="mt-3 font-semibold">When I search for a restaurant:</p>
            <Bullets
              items={[
                "I expect to be able to search for food categories, businesses and nonprofits in the search bar.",
              ]}
            />
            <p className="mt-3 font-semibold">When I am logged in and am a manager:</p>
            <Bullets
              items={["When I'm on my profile settings page I expect to see all of my posts."]}
            />
          </div>
          <div>
            <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#156b5c] dark:text-[#9af2c0]">
              Update an item or request
            </h4>
            <p className="mb-2 font-semibold">When I am logged in as a manager:</p>
            <Bullets
              items={[
                "I want to edit my posts by clicking an edit button that replaces the usual request or ask question button.",
                "I expect to see the same modal form but have it be pre-populated with the previous values.",
                "When I click on the input, I expect the data to persist and not disappear so that I don't have to re-enter information.",
              ]}
            />
          </div>
          <div>
            <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#156b5c] dark:text-[#9af2c0]">
              Delete an item or request
            </h4>
            <p className="mb-2 font-semibold">When I am logged in as a manager:</p>
            <Bullets
              items={[
                "I want to be able to delete my post by clicking on a delete button that replaces the usual request or ask question buttons.",
              ]}
            />
          </div>
        </div>
      </Block>

      <Block title="Reserve pickup time">
        <div className="space-y-8">
          <div>
            <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#156b5c] dark:text-[#9af2c0]">
              Create Reservation
            </h4>
            <p className="mb-2">As a logged in nonprofit manager:</p>
            <Bullets
              items={[
                "I want to be able to create a reservation to pick up food from a business.",
                "When I click on an available time slot I expect the reservation form modal to appear.",
                "When the create reservation modal is displayed I expect to see a list of time slots as well as the business's address.",
              ]}
            />
          </div>
          <div>
            <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#156b5c] dark:text-[#9af2c0]">
              Read Reservations
            </h4>
            <p className="mb-2">As a logged in nonprofit manager:</p>
            <Bullets
              items={[
                "When I am on a specific business's page I want to view business hours and open reservation time slots",
                "When I'm on my profile settings page I expect my current reservations to be displayed if I click on the reservations tab",
                "I also expect to see requests in process in the notification bar directly under the navbar.",
              ]}
            />
          </div>
          <div>
            <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#156b5c] dark:text-[#9af2c0]">
              Update Reservation
            </h4>
            <p className="mb-2">As a logged in nonprofit manager:</p>
            <Bullets
              items={[
                "I want to be able to update a reservation for an item by clicking on the item in my feed, notification bar or profile settings page.",
                "When a current reservation is displayed I expect to be able to click 'edit' to display the reservation edit modal.",
                "If my new request time is valid, I want the item to update.",
              ]}
            />
          </div>
          <div>
            <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#156b5c] dark:text-[#9af2c0]">
              Delete Reservation
            </h4>
            <p className="mb-2">As a logged in nonprofit manager:</p>
            <Bullets
              items={[
                "I want to be able to delete a reservation",
                "I expect to follow the same steps as editing, but press a button with a different color",
                "I expect to see a warning message before I confirm the deletion",
              ]}
            />
          </div>
        </div>
      </Block>

      <Block title="Messages">
        <div className="space-y-8">
          <div>
            <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#156b5c] dark:text-[#9af2c0]">
              Sending a message
            </h4>
            <p className="mb-2">As a logged in nonprofit or business manager:</p>
            <Bullets
              items={[
                "I want to be able to click on the ask a question button to send a message to a user",
                "I want to be able to respond to messages with an easy to use interface.",
              ]}
            />
            <p className="mt-3 font-semibold">As a volunteer:</p>
            <Bullets
              items={[
                "I do not expect to be able to send messages to businesses",
                "I expect to be able to communicate with my manager through messages",
                "I expect to be able to send emergency messages to my manager",
              ]}
            />
          </div>
          <div>
            <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#156b5c] dark:text-[#9af2c0]">
              Read Messages
            </h4>
            <p className="mb-2">As a logged in user:</p>
            <Bullets
              items={[
                "I want to be able to see all of my messages by clicking the inbox icon",
                "I want to be able to filter through messages by date",
                "I expect to see a notification either in the notification bar or a red dot on the top right corner of the inbox icon",
              ]}
            />
          </div>
          <div>
            <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#156b5c] dark:text-[#9af2c0]">
              Update Messages
            </h4>
            <p className="mb-2">As a logged in user:</p>
            <Bullets
              items={[
                "I expect to be able to edit my messages by clicking on an edit button or underlined red text",
                "I expect to see the old message get crossed out like on Slack or see an 'edited' text outside of the message container",
              ]}
            />
          </div>
          <div>
            <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#156b5c] dark:text-[#9af2c0]">
              Delete Messages
            </h4>
            <p className="mb-2">As a logged in user:</p>
            <Bullets
              items={[
                "I expect there to be a delete button or underlined red text next to my message",
                "I expect my previous message container to have a grey fill with text saying 'deleted message' with a timestamp",
              ]}
            />
          </div>
        </div>
      </Block>

      <Block title="Favorites">
        <div className="space-y-8">
          <div>
            <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#156b5c] dark:text-[#9af2c0]">
              Adding to Favorites
            </h4>
            <p className="mb-2">As a logged in user:</p>
            <Bullets
              items={[
                "I expect to see a low opacity heart icon on an item or request card.",
                "If I click on it, I expect to see the icon get filled in and have the card added to my favorites list.",
              ]}
            />
            <p className="mt-3 font-semibold">As an unregistered user:</p>
            <Bullets items={["I do not expect to see a heart icon at all."]} />
          </div>
          <div>
            <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#156b5c] dark:text-[#9af2c0]">
              Viewing Favorites
            </h4>
            <p className="mb-2">As a logged in user:</p>
            <Bullets
              items={[
                "I expect to see a favorites filter or page that contains all of my liked items or requests.",
              ]}
            />
          </div>
          <div>
            <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#156b5c] dark:text-[#9af2c0]">
              Deleting Favorites
            </h4>
            <p className="mb-2">As a logged in user:</p>
            <Bullets
              items={[
                "I want to be able to delete liked posts by clicking on the heart icon.",
                "I expect the fill of the icon to go back to low opacity mode.",
              ]}
            />
          </div>
        </div>
      </Block>
    </div>
  );
}
