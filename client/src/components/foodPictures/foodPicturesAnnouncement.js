//source from: https://www.npmjs.com/package/react-announcement,
// https://github.com/kristofferandreasen/react-announcement/blob/master/example/src/App.js
import * as React from "react";
import pic from "../../pictures/announcementPic.jpg";
import Announcement from "react-announcement";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";

class FoodPicturesAnnouncement extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);

    const { cookies } = props;
    cookies.remove("banner");
  }

  render() {
    return (
        <Announcement
            title="Share &amp; get your pictures featured!"
            subtitle="Top 3 voted food pictures of the recent 7 days will be featured on the landing page!"
            imageSource={pic}
            secondsBeforeBannerShows={3}
            closeIconSize={25}
        />
    );
  }
}
export default withCookies(FoodPicturesAnnouncement);
