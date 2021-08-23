import React from "react";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";

const { filesBaseUrl } = Meteor.settings.public;
const RenderMedia = ({media}) => {
    const thumbnailUrl = Array.isArray(media) && media.length > 0 && media[0].URLs && (media[0].URLs.thumbnail || media[0].URLs.small);

    if (!thumbnailUrl) {
        return (
          <img
            src={"/resources/placeholder.gif"}
            alt={"productThumbnail"}
            width="100%"
          />
        );
      }
    
      return (
        <img
          src={`${filesBaseUrl}${thumbnailUrl}`}
          alt={"productThumbnail"}
          width="100%"
        />
      );
};

RenderMedia.propTypes = {
    media: PropTypes.arrayOf(PropTypes.shape({
        URLs: PropTypes.shape({
            small: PropTypes.string,
            thumbnail: PropTypes.string,
            large: PropTypes.string,
            medium: PropTypes.string,
            original: PropTypes.string
        })
    }))
}

RenderMedia.defaultProps = {
    media: null
}

export default RenderMedia;