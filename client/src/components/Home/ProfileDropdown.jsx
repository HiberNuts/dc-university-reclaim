import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { HEADER_XP, HEADER_USER } from "../../Constants/Assets";
const ProfileDropDown = ({ account, openAccountModal, toggleNavbar, loggedInUserData, xp = 0, homeRoute = false }) => {
  return (
    <div className=" z-50 min-w-56 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button>
            <div className={`flex gap-4 border-2 rounded-[24px] px-5 py-2 cursor-pointer ${homeRoute ? 'text-white' : 'text-white'}`}>
              <div className="flex gap-2">
                <img src={HEADER_XP} />
                <span className="pt-[2px]">{xp} XP</span>
              </div>
              <div className="flex gap-2">
                {
                  loggedInUserData?.image ?
                    <img className="w-7 h-7 rounded-[50%]" src={loggedInUserData?.image ?? HEADER_USER} />
                    :
                    <img src={HEADER_USER} />
                }
                {
                  loggedInUserData?.shardId &&
                  <span className="pt-[2px]">{loggedInUserData?.shardId?.slice(0, 13) + (loggedInUserData?.shardId?.length > 13 ? ".." : "")}</span>
                }
              </div>
            </div>
          </Menu.Button>
          {/* <Menu.Button className="flex w-[170px] h-11 align-middle text-center items-center justify-evenly rounded-md  "> */}
          {/* <GreenButton
              isHoveredReq={true}
              text={loggedInUserData?.username == "default" ? "Anon" : loggedInUserData?.username}
            /> */}

          {/* </Menu.Button> */}
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md border-2 border-shardeumBlue bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={toggleNavbar}
                    className={`${active ? "bg-shardeumBlue text-white" : "text-gray-900"
                      } group font-helvetica-neue-roman flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <AccountActiveIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                    ) : (
                      <AccountInactiveIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                    )}
                    {account}
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    onClick={toggleNavbar}
                    to={loggedInUserData?.shardId == '' ? 'profile/edit' : loggedInUserData?.shardId}
                    className={`${active ? "bg-shardeumBlue text-white" : "text-gray-900"
                      } group font-helvetica-neue-roman flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <ProfileActiveIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                    ) : (
                      <ProfileInActiveIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                    )}
                    Profile
                  </Link>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      openAccountModal();
                      if (toggleNavbar) {
                        toggleNavbar();
                      }

                    }}
                    className={`${active ? "bg-shardeumBlue text-white" : "text-gray-900"
                      } group font-helvetica-neue-roman flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <LogoutActiveIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                    ) : (
                      <LogoutInActiveIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                    )}
                    Log Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

function AccountInactiveIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="Account">
      <path
        d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2ZM10,26.39a6,6,0,0,1,11.94,0,11.87,11.87,0,0,1-11.94,0Zm13.74-1.26a8,8,0,0,0-15.54,0,12,12,0,1,1,15.54,0ZM16,8a5,5,0,1,0,5,5A5,5,0,0,0,16,8Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,16,16Z"
        data-name="13  User, Account, Circle, Person"
        fill="#3A4CFF"
        class="color000000 svgShape"
      ></path>
    </svg>
  );
}

function AccountActiveIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="Account">
      <path
        d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2ZM10,26.39a6,6,0,0,1,11.94,0,11.87,11.87,0,0,1-11.94,0Zm13.74-1.26a8,8,0,0,0-15.54,0,12,12,0,1,1,15.54,0ZM16,8a5,5,0,1,0,5,5A5,5,0,0,0,16,8Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,16,16Z"
        data-name="13  User, Account, Circle, Person"
        fill="#ffffff"
        class="color000000 svgShape"
      ></path>
    </svg>
  );
}

function ProfileInActiveIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" id="Dashboard">
      <path
        fill="#3A4CFF"
        fill-rule="evenodd"
        d="M17.286 8H20.714C21.9164 7.99999 22.8862 7.99998 23.6756 8.05384 24.4872 8.10922 25.205 8.22597 25.8846 8.50747 27.5181 9.1841 28.8159 10.4819 29.4925 12.1154 29.774 12.795 29.8908 13.5128 29.9462 14.3244 30 15.1138 30 16.0836 30 17.286V20.714C30 21.9164 30 22.8863 29.9462 23.6756 29.8908 24.4872 29.774 25.205 29.4925 25.8846 28.8159 27.5181 27.5181 28.8159 25.8846 29.4925 25.205 29.774 24.4872 29.8908 23.6756 29.9462 22.8862 30 21.9164 30 20.714 30H17.286C16.0836 30 15.1138 30 14.3244 29.9462 13.5128 29.8908 12.795 29.774 12.1154 29.4925 10.4819 28.8159 9.1841 27.5181 8.50747 25.8846 8.22597 25.205 8.10922 24.4872 8.05384 23.6756 7.99998 22.8862 7.99999 21.9164 8 20.714V17.286C7.99999 16.0836 7.99998 15.1138 8.05384 14.3244 8.10922 13.5128 8.22597 12.795 8.50747 12.1154 9.1841 10.4819 10.4819 9.1841 12.1154 8.50747 12.795 8.22597 13.5128 8.10922 14.3244 8.05384 15.1138 7.99998 16.0836 7.99999 17.286 8zM14.5059 10.7143C13.83 10.7604 13.4364 10.8467 13.1359 10.9711 12.1558 11.3771 11.3771 12.1558 10.9711 13.1359 10.8467 13.4364 10.7604 13.83 10.7143 14.5059 10.6674 15.1938 10.6667 16.0726 10.6667 17.3333V20.6667C10.6667 21.9274 10.6674 22.8062 10.7143 23.4941 10.7604 24.17 10.8467 24.5636 10.9711 24.8641 11.3771 25.8442 12.1558 26.6229 13.1359 27.0289 13.4364 27.1533 13.83 27.2396 14.5059 27.2857 15.1938 27.3326 16.0726 27.3333 17.3333 27.3333H20.6667C21.9274 27.3333 22.8062 27.3326 23.4941 27.2857 24.17 27.2396 24.5636 27.1533 24.8641 27.0289 25.8442 26.6229 26.6229 25.8442 27.0289 24.8641 27.1533 24.5636 27.2396 24.17 27.2857 23.4941 27.3326 22.8062 27.3333 21.9274 27.3333 20.6667V17.3333C27.3333 16.0726 27.3326 15.1938 27.2857 14.5059 27.2396 13.83 27.1533 13.4364 27.0289 13.1359 26.6229 12.1558 25.8442 11.3771 24.8641 10.9711 24.5636 10.8467 24.17 10.7604 23.4941 10.7143 22.8062 10.6674 21.9274 10.6667 20.6667 10.6667H17.3333C16.0726 10.6667 15.1938 10.6674 14.5059 10.7143zM17.286 34H20.714C21.9164 34 22.8862 34 23.6756 34.0538 24.4872 34.1092 25.205 34.226 25.8846 34.5075 27.5181 35.1841 28.8159 36.4819 29.4925 38.1154 29.774 38.795 29.8908 39.5128 29.9462 40.3244 30 41.1138 30 42.0836 30 43.286V46.714C30 47.9164 30 48.8863 29.9462 49.6756 29.8908 50.4872 29.774 51.205 29.4925 51.8846 28.8159 53.5181 27.5181 54.8159 25.8846 55.4925 25.205 55.774 24.4872 55.8908 23.6756 55.9462 22.8862 56 21.9164 56 20.714 56H17.286C16.0836 56 15.1138 56 14.3244 55.9462 13.5128 55.8908 12.795 55.774 12.1154 55.4925 10.4819 54.8159 9.1841 53.5181 8.50747 51.8846 8.22597 51.205 8.10922 50.4872 8.05384 49.6756 7.99998 48.8862 7.99999 47.9164 8 46.714V43.286C7.99999 42.0836 7.99998 41.1138 8.05384 40.3244 8.10922 39.5128 8.22597 38.795 8.50747 38.1154 9.1841 36.4819 10.4819 35.1841 12.1154 34.5075 12.795 34.226 13.5128 34.1092 14.3244 34.0538 15.1138 34 16.0836 34 17.286 34zM14.5059 36.7143C13.83 36.7604 13.4364 36.8467 13.1359 36.9711 12.1558 37.3771 11.3771 38.1558 10.9711 39.1359 10.8467 39.4364 10.7604 39.83 10.7143 40.5059 10.6674 41.1938 10.6667 42.0726 10.6667 43.3333V46.6667C10.6667 47.9274 10.6674 48.8062 10.7143 49.4941 10.7604 50.17 10.8467 50.5636 10.9711 50.8641 11.3771 51.8442 12.1558 52.6229 13.1359 53.0289 13.4364 53.1533 13.83 53.2396 14.5059 53.2857 15.1938 53.3326 16.0726 53.3333 17.3333 53.3333H20.6667C21.9274 53.3333 22.8062 53.3326 23.4941 53.2857 24.17 53.2396 24.5636 53.1533 24.8641 53.0289 25.8442 52.6229 26.6229 51.8442 27.0289 50.8641 27.1533 50.5636 27.2396 50.17 27.2857 49.4941 27.3326 48.8062 27.3333 47.9274 27.3333 46.6667V43.3333C27.3333 42.0726 27.3326 41.1938 27.2857 40.5059 27.2396 39.83 27.1533 39.4364 27.0289 39.1359 26.6229 38.1558 25.8442 37.3771 24.8641 36.9711 24.5636 36.8467 24.17 36.7604 23.4941 36.7143 22.8062 36.6674 21.9274 36.6667 20.6667 36.6667H17.3333C16.0726 36.6667 15.1938 36.6674 14.5059 36.7143zM43.286 8H46.714C47.9164 7.99999 48.8862 7.99998 49.6756 8.05384 50.4872 8.10922 51.205 8.22597 51.8846 8.50747 53.5181 9.1841 54.8159 10.4819 55.4925 12.1154 55.774 12.795 55.8908 13.5128 55.9462 14.3244 56 15.1138 56 16.0836 56 17.286V20.714C56 21.9164 56 22.8863 55.9462 23.6756 55.8908 24.4872 55.774 25.205 55.4925 25.8846 54.8159 27.5181 53.5181 28.8159 51.8846 29.4925 51.205 29.774 50.4872 29.8908 49.6756 29.9462 48.8862 30 47.9164 30 46.714 30H43.286C42.0836 30 41.1138 30 40.3244 29.9462 39.5128 29.8908 38.795 29.774 38.1154 29.4925 36.4819 28.8159 35.1841 27.5181 34.5075 25.8846 34.226 25.205 34.1092 24.4872 34.0538 23.6756 34 22.8862 34 21.9164 34 20.714V17.286C34 16.0836 34 15.1138 34.0538 14.3244 34.1092 13.5128 34.226 12.795 34.5075 12.1154 35.1841 10.4819 36.4819 9.1841 38.1154 8.50747 38.795 8.22597 39.5128 8.10922 40.3244 8.05384 41.1138 7.99998 42.0836 7.99999 43.286 8zM40.5059 10.7143C39.83 10.7604 39.4364 10.8467 39.1359 10.9711 38.1558 11.3771 37.3771 12.1558 36.9711 13.1359 36.8467 13.4364 36.7604 13.83 36.7143 14.5059 36.6674 15.1938 36.6667 16.0726 36.6667 17.3333V20.6667C36.6667 21.9274 36.6674 22.8062 36.7143 23.4941 36.7604 24.17 36.8467 24.5636 36.9711 24.8641 37.3771 25.8442 38.1558 26.6229 39.1359 27.0289 39.4364 27.1533 39.83 27.2396 40.5059 27.2857 41.1938 27.3326 42.0726 27.3333 43.3333 27.3333H46.6667C47.9274 27.3333 48.8062 27.3326 49.4941 27.2857 50.17 27.2396 50.5636 27.1533 50.8641 27.0289 51.8442 26.6229 52.6229 25.8442 53.0289 24.8641 53.1533 24.5636 53.2396 24.17 53.2857 23.4941 53.3326 22.8062 53.3333 21.9274 53.3333 20.6667V17.3333C53.3333 16.0726 53.3326 15.1938 53.2857 14.5059 53.2396 13.83 53.1533 13.4364 53.0289 13.1359 52.6229 12.1558 51.8442 11.3771 50.8641 10.9711 50.5636 10.8467 50.17 10.7604 49.4941 10.7143 48.8062 10.6674 47.9274 10.6667 46.6667 10.6667H43.3333C42.0726 10.6667 41.1938 10.6674 40.5059 10.7143zM43.286 34H46.714C47.9164 34 48.8862 34 49.6756 34.0538 50.4872 34.1092 51.205 34.226 51.8846 34.5075 53.5181 35.1841 54.8159 36.4819 55.4925 38.1154 55.774 38.795 55.8908 39.5128 55.9462 40.3244 56 41.1138 56 42.0836 56 43.286V46.714C56 47.9164 56 48.8863 55.9462 49.6756 55.8908 50.4872 55.774 51.205 55.4925 51.8846 54.8159 53.5181 53.5181 54.8159 51.8846 55.4925 51.205 55.774 50.4872 55.8908 49.6756 55.9462 48.8862 56 47.9164 56 46.714 56H43.286C42.0836 56 41.1138 56 40.3244 55.9462 39.5128 55.8908 38.795 55.774 38.1154 55.4925 36.4819 54.8159 35.1841 53.5181 34.5075 51.8846 34.226 51.205 34.1092 50.4872 34.0538 49.6756 34 48.8862 34 47.9164 34 46.714V43.286C34 42.0836 34 41.1138 34.0538 40.3244 34.1092 39.5128 34.226 38.795 34.5075 38.1154 35.1841 36.4819 36.4819 35.1841 38.1154 34.5075 38.795 34.226 39.5128 34.1092 40.3244 34.0538 41.1138 34 42.0836 34 43.286 34zM40.5059 36.7143C39.83 36.7604 39.4364 36.8467 39.1359 36.9711 38.1558 37.3771 37.3771 38.1558 36.9711 39.1359 36.8467 39.4364 36.7604 39.83 36.7143 40.5059 36.6674 41.1938 36.6667 42.0726 36.6667 43.3333V46.6667C36.6667 47.9274 36.6674 48.8062 36.7143 49.4941 36.7604 50.17 36.8467 50.5636 36.9711 50.8641 37.3771 51.8442 38.1558 52.6229 39.1359 53.0289 39.4364 53.1533 39.83 53.2396 40.5059 53.2857 41.1938 53.3326 42.0726 53.3333 43.3333 53.3333H46.6667C47.9274 53.3333 48.8062 53.3326 49.4941 53.2857 50.17 53.2396 50.5636 53.1533 50.8641 53.0289 51.8442 52.6229 52.6229 51.8442 53.0289 50.8641 53.1533 50.5636 53.2396 50.17 53.2857 49.4941 53.3326 48.8062 53.3333 47.9274 53.3333 46.6667V43.3333C53.3333 42.0726 53.3326 41.1938 53.2857 40.5059 53.2396 39.83 53.1533 39.4364 53.0289 39.1359 52.6229 38.1558 51.8442 37.3771 50.8641 36.9711 50.5636 36.8467 50.17 36.7604 49.4941 36.7143 48.8062 36.6674 47.9274 36.6667 46.6667 36.6667H43.3333C42.0726 36.6667 41.1938 36.6674 40.5059 36.7143z"
        clip-rule="evenodd"
        class="color2b3151 svgShape"
      ></path>
    </svg>
  );
}

function ProfileActiveIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" id="Dashboard">
      <path
        fill="#ffffff"
        fill-rule="evenodd"
        d="M17.286 8H20.714C21.9164 7.99999 22.8862 7.99998 23.6756 8.05384 24.4872 8.10922 25.205 8.22597 25.8846 8.50747 27.5181 9.1841 28.8159 10.4819 29.4925 12.1154 29.774 12.795 29.8908 13.5128 29.9462 14.3244 30 15.1138 30 16.0836 30 17.286V20.714C30 21.9164 30 22.8863 29.9462 23.6756 29.8908 24.4872 29.774 25.205 29.4925 25.8846 28.8159 27.5181 27.5181 28.8159 25.8846 29.4925 25.205 29.774 24.4872 29.8908 23.6756 29.9462 22.8862 30 21.9164 30 20.714 30H17.286C16.0836 30 15.1138 30 14.3244 29.9462 13.5128 29.8908 12.795 29.774 12.1154 29.4925 10.4819 28.8159 9.1841 27.5181 8.50747 25.8846 8.22597 25.205 8.10922 24.4872 8.05384 23.6756 7.99998 22.8862 7.99999 21.9164 8 20.714V17.286C7.99999 16.0836 7.99998 15.1138 8.05384 14.3244 8.10922 13.5128 8.22597 12.795 8.50747 12.1154 9.1841 10.4819 10.4819 9.1841 12.1154 8.50747 12.795 8.22597 13.5128 8.10922 14.3244 8.05384 15.1138 7.99998 16.0836 7.99999 17.286 8zM14.5059 10.7143C13.83 10.7604 13.4364 10.8467 13.1359 10.9711 12.1558 11.3771 11.3771 12.1558 10.9711 13.1359 10.8467 13.4364 10.7604 13.83 10.7143 14.5059 10.6674 15.1938 10.6667 16.0726 10.6667 17.3333V20.6667C10.6667 21.9274 10.6674 22.8062 10.7143 23.4941 10.7604 24.17 10.8467 24.5636 10.9711 24.8641 11.3771 25.8442 12.1558 26.6229 13.1359 27.0289 13.4364 27.1533 13.83 27.2396 14.5059 27.2857 15.1938 27.3326 16.0726 27.3333 17.3333 27.3333H20.6667C21.9274 27.3333 22.8062 27.3326 23.4941 27.2857 24.17 27.2396 24.5636 27.1533 24.8641 27.0289 25.8442 26.6229 26.6229 25.8442 27.0289 24.8641 27.1533 24.5636 27.2396 24.17 27.2857 23.4941 27.3326 22.8062 27.3333 21.9274 27.3333 20.6667V17.3333C27.3333 16.0726 27.3326 15.1938 27.2857 14.5059 27.2396 13.83 27.1533 13.4364 27.0289 13.1359 26.6229 12.1558 25.8442 11.3771 24.8641 10.9711 24.5636 10.8467 24.17 10.7604 23.4941 10.7143 22.8062 10.6674 21.9274 10.6667 20.6667 10.6667H17.3333C16.0726 10.6667 15.1938 10.6674 14.5059 10.7143zM17.286 34H20.714C21.9164 34 22.8862 34 23.6756 34.0538 24.4872 34.1092 25.205 34.226 25.8846 34.5075 27.5181 35.1841 28.8159 36.4819 29.4925 38.1154 29.774 38.795 29.8908 39.5128 29.9462 40.3244 30 41.1138 30 42.0836 30 43.286V46.714C30 47.9164 30 48.8863 29.9462 49.6756 29.8908 50.4872 29.774 51.205 29.4925 51.8846 28.8159 53.5181 27.5181 54.8159 25.8846 55.4925 25.205 55.774 24.4872 55.8908 23.6756 55.9462 22.8862 56 21.9164 56 20.714 56H17.286C16.0836 56 15.1138 56 14.3244 55.9462 13.5128 55.8908 12.795 55.774 12.1154 55.4925 10.4819 54.8159 9.1841 53.5181 8.50747 51.8846 8.22597 51.205 8.10922 50.4872 8.05384 49.6756 7.99998 48.8862 7.99999 47.9164 8 46.714V43.286C7.99999 42.0836 7.99998 41.1138 8.05384 40.3244 8.10922 39.5128 8.22597 38.795 8.50747 38.1154 9.1841 36.4819 10.4819 35.1841 12.1154 34.5075 12.795 34.226 13.5128 34.1092 14.3244 34.0538 15.1138 34 16.0836 34 17.286 34zM14.5059 36.7143C13.83 36.7604 13.4364 36.8467 13.1359 36.9711 12.1558 37.3771 11.3771 38.1558 10.9711 39.1359 10.8467 39.4364 10.7604 39.83 10.7143 40.5059 10.6674 41.1938 10.6667 42.0726 10.6667 43.3333V46.6667C10.6667 47.9274 10.6674 48.8062 10.7143 49.4941 10.7604 50.17 10.8467 50.5636 10.9711 50.8641 11.3771 51.8442 12.1558 52.6229 13.1359 53.0289 13.4364 53.1533 13.83 53.2396 14.5059 53.2857 15.1938 53.3326 16.0726 53.3333 17.3333 53.3333H20.6667C21.9274 53.3333 22.8062 53.3326 23.4941 53.2857 24.17 53.2396 24.5636 53.1533 24.8641 53.0289 25.8442 52.6229 26.6229 51.8442 27.0289 50.8641 27.1533 50.5636 27.2396 50.17 27.2857 49.4941 27.3326 48.8062 27.3333 47.9274 27.3333 46.6667V43.3333C27.3333 42.0726 27.3326 41.1938 27.2857 40.5059 27.2396 39.83 27.1533 39.4364 27.0289 39.1359 26.6229 38.1558 25.8442 37.3771 24.8641 36.9711 24.5636 36.8467 24.17 36.7604 23.4941 36.7143 22.8062 36.6674 21.9274 36.6667 20.6667 36.6667H17.3333C16.0726 36.6667 15.1938 36.6674 14.5059 36.7143zM43.286 8H46.714C47.9164 7.99999 48.8862 7.99998 49.6756 8.05384 50.4872 8.10922 51.205 8.22597 51.8846 8.50747 53.5181 9.1841 54.8159 10.4819 55.4925 12.1154 55.774 12.795 55.8908 13.5128 55.9462 14.3244 56 15.1138 56 16.0836 56 17.286V20.714C56 21.9164 56 22.8863 55.9462 23.6756 55.8908 24.4872 55.774 25.205 55.4925 25.8846 54.8159 27.5181 53.5181 28.8159 51.8846 29.4925 51.205 29.774 50.4872 29.8908 49.6756 29.9462 48.8862 30 47.9164 30 46.714 30H43.286C42.0836 30 41.1138 30 40.3244 29.9462 39.5128 29.8908 38.795 29.774 38.1154 29.4925 36.4819 28.8159 35.1841 27.5181 34.5075 25.8846 34.226 25.205 34.1092 24.4872 34.0538 23.6756 34 22.8862 34 21.9164 34 20.714V17.286C34 16.0836 34 15.1138 34.0538 14.3244 34.1092 13.5128 34.226 12.795 34.5075 12.1154 35.1841 10.4819 36.4819 9.1841 38.1154 8.50747 38.795 8.22597 39.5128 8.10922 40.3244 8.05384 41.1138 7.99998 42.0836 7.99999 43.286 8zM40.5059 10.7143C39.83 10.7604 39.4364 10.8467 39.1359 10.9711 38.1558 11.3771 37.3771 12.1558 36.9711 13.1359 36.8467 13.4364 36.7604 13.83 36.7143 14.5059 36.6674 15.1938 36.6667 16.0726 36.6667 17.3333V20.6667C36.6667 21.9274 36.6674 22.8062 36.7143 23.4941 36.7604 24.17 36.8467 24.5636 36.9711 24.8641 37.3771 25.8442 38.1558 26.6229 39.1359 27.0289 39.4364 27.1533 39.83 27.2396 40.5059 27.2857 41.1938 27.3326 42.0726 27.3333 43.3333 27.3333H46.6667C47.9274 27.3333 48.8062 27.3326 49.4941 27.2857 50.17 27.2396 50.5636 27.1533 50.8641 27.0289 51.8442 26.6229 52.6229 25.8442 53.0289 24.8641 53.1533 24.5636 53.2396 24.17 53.2857 23.4941 53.3326 22.8062 53.3333 21.9274 53.3333 20.6667V17.3333C53.3333 16.0726 53.3326 15.1938 53.2857 14.5059 53.2396 13.83 53.1533 13.4364 53.0289 13.1359 52.6229 12.1558 51.8442 11.3771 50.8641 10.9711 50.5636 10.8467 50.17 10.7604 49.4941 10.7143 48.8062 10.6674 47.9274 10.6667 46.6667 10.6667H43.3333C42.0726 10.6667 41.1938 10.6674 40.5059 10.7143zM43.286 34H46.714C47.9164 34 48.8862 34 49.6756 34.0538 50.4872 34.1092 51.205 34.226 51.8846 34.5075 53.5181 35.1841 54.8159 36.4819 55.4925 38.1154 55.774 38.795 55.8908 39.5128 55.9462 40.3244 56 41.1138 56 42.0836 56 43.286V46.714C56 47.9164 56 48.8863 55.9462 49.6756 55.8908 50.4872 55.774 51.205 55.4925 51.8846 54.8159 53.5181 53.5181 54.8159 51.8846 55.4925 51.205 55.774 50.4872 55.8908 49.6756 55.9462 48.8862 56 47.9164 56 46.714 56H43.286C42.0836 56 41.1138 56 40.3244 55.9462 39.5128 55.8908 38.795 55.774 38.1154 55.4925 36.4819 54.8159 35.1841 53.5181 34.5075 51.8846 34.226 51.205 34.1092 50.4872 34.0538 49.6756 34 48.8862 34 47.9164 34 46.714V43.286C34 42.0836 34 41.1138 34.0538 40.3244 34.1092 39.5128 34.226 38.795 34.5075 38.1154 35.1841 36.4819 36.4819 35.1841 38.1154 34.5075 38.795 34.226 39.5128 34.1092 40.3244 34.0538 41.1138 34 42.0836 34 43.286 34zM40.5059 36.7143C39.83 36.7604 39.4364 36.8467 39.1359 36.9711 38.1558 37.3771 37.3771 38.1558 36.9711 39.1359 36.8467 39.4364 36.7604 39.83 36.7143 40.5059 36.6674 41.1938 36.6667 42.0726 36.6667 43.3333V46.6667C36.6667 47.9274 36.6674 48.8062 36.7143 49.4941 36.7604 50.17 36.8467 50.5636 36.9711 50.8641 37.3771 51.8442 38.1558 52.6229 39.1359 53.0289 39.4364 53.1533 39.83 53.2396 40.5059 53.2857 41.1938 53.3326 42.0726 53.3333 43.3333 53.3333H46.6667C47.9274 53.3333 48.8062 53.3326 49.4941 53.2857 50.17 53.2396 50.5636 53.1533 50.8641 53.0289 51.8442 52.6229 52.6229 51.8442 53.0289 50.8641 53.1533 50.5636 53.2396 50.17 53.2857 49.4941 53.3326 48.8062 53.3333 47.9274 53.3333 46.6667V43.3333C53.3333 42.0726 53.3326 41.1938 53.2857 40.5059 53.2396 39.83 53.1533 39.4364 53.0289 39.1359 52.6229 38.1558 51.8442 37.3771 50.8641 36.9711 50.5636 36.8467 50.17 36.7604 49.4941 36.7143 48.8062 36.6674 47.9274 36.6667 46.6667 36.6667H43.3333C42.0726 36.6667 41.1938 36.6674 40.5059 36.7143z"
        clip-rule="evenodd"
        class="color2b3151 svgShape"
      ></path>
    </svg>
  );
}

function LogoutInActiveIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      enable-background="new 0 0 24 24"
      viewBox="0 0 24 24"
      id="SignOut"
    >
      <path
        d="M4,12c0,0.276123,0.223877,0.5,0.5,0.5h8.7930298l-2.6465454,2.6464844c-0.09375,0.09375-0.1464233,0.2208862-0.1464233,0.3534546C10.5,15.776062,10.723877,15.999939,11,16c0.1326294,0.0001221,0.2598267-0.0525513,0.3534546-0.1464844l3.5-3.5c0.000061-0.000061,0.0001221-0.000061,0.0001831-0.0001221c0.1951294-0.1952515,0.1950684-0.5117188-0.0001831-0.7068481l-3.5-3.5c-0.1937256-0.1871338-0.5009155-0.1871338-0.6947021,0c-0.1986084,0.1918335-0.2041016,0.5083618-0.0122681,0.7069702L13.2930298,11.5H4.5C4.223877,11.5,4,11.723877,4,12z M17.5,2h-11C5.119812,2.0012817,4.0012817,3.119812,4,4.5v4C4,8.776123,4.223877,9,4.5,9S5,8.776123,5,8.5v-4C5.0009155,3.671936,5.671936,3.0009155,6.5,3h11c0.828064,0.0009155,1.4990845,0.671936,1.5,1.5v15c-0.0009155,0.828064-0.671936,1.4990845-1.5,1.5h-11c-0.828064-0.0009155-1.4990845-0.671936-1.5-1.5v-4C5,15.223877,4.776123,15,4.5,15S4,15.223877,4,15.5v4c0.0012817,1.380188,1.119812,2.4987183,2.5,2.5h11c1.380188-0.0012817,2.4987183-1.119812,2.5-2.5v-15C19.9987183,3.119812,18.880188,2.0012817,17.5,2z"
        fill="#3A4CFF"
        class="color000000 svgShape"
      ></path>
    </svg>
  );
}

function LogoutActiveIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      enable-background="new 0 0 24 24"
      viewBox="0 0 24 24"
      id="SignOut"
    >
      <path
        d="M4,12c0,0.276123,0.223877,0.5,0.5,0.5h8.7930298l-2.6465454,2.6464844c-0.09375,0.09375-0.1464233,0.2208862-0.1464233,0.3534546C10.5,15.776062,10.723877,15.999939,11,16c0.1326294,0.0001221,0.2598267-0.0525513,0.3534546-0.1464844l3.5-3.5c0.000061-0.000061,0.0001221-0.000061,0.0001831-0.0001221c0.1951294-0.1952515,0.1950684-0.5117188-0.0001831-0.7068481l-3.5-3.5c-0.1937256-0.1871338-0.5009155-0.1871338-0.6947021,0c-0.1986084,0.1918335-0.2041016,0.5083618-0.0122681,0.7069702L13.2930298,11.5H4.5C4.223877,11.5,4,11.723877,4,12z M17.5,2h-11C5.119812,2.0012817,4.0012817,3.119812,4,4.5v4C4,8.776123,4.223877,9,4.5,9S5,8.776123,5,8.5v-4C5.0009155,3.671936,5.671936,3.0009155,6.5,3h11c0.828064,0.0009155,1.4990845,0.671936,1.5,1.5v15c-0.0009155,0.828064-0.671936,1.4990845-1.5,1.5h-11c-0.828064-0.0009155-1.4990845-0.671936-1.5-1.5v-4C5,15.223877,4.776123,15,4.5,15S4,15.223877,4,15.5v4c0.0012817,1.380188,1.119812,2.4987183,2.5,2.5h11c1.380188-0.0012817,2.4987183-1.119812,2.5-2.5v-15C19.9987183,3.119812,18.880188,2.0012817,17.5,2z"
        fill="#ffffff"
        class="color000000 svgShape"
      ></path>
    </svg>
  );
}

export default ProfileDropDown;
