import * as React from "react";
import pic from "./announcementPic.jpg";
import Announcement from "react-announcement";

export default class FoodPicturesAnnouncement extends React.Component {
  render() {
    return (
      <Announcement
        title="Get your pictures featured!"
        subtitle="Top 3 voted food pictures trending in the past 7 days will be featured on the landing page!"
        // link="http://smart-cook-436.herokuapp.com/"
        imageSource={pic}
        daysToLive={0}
        secondsBeforeBannerShows={5}
        closeIconSize={25}
      />
    );
  }
}
