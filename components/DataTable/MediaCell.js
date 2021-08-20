import React from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";

const { filesBaseUrl } = Meteor.settings.public;

/**
 * @summary Custom React-Table cell to render a product's thumbnail image.
 * @param {Object} row - The current row being rendered by React-Table
 * @returns {React.Component} A React component
 */
export default function MediaCell({ row }) {
  console.log(row);
  const thumbnailUrl = row.original && row.original.product.media && row.original.product.media[0]
    && row.original.product.media[0].URLs && (row.original.product.media[0].URLs.thumbnail || row.original.product.media[0].URLs.small);

  if (!thumbnailUrl) {
    return (
      <img
        src={"/resources/placeholder.gif"}
        alt={row.values.title}
        width="36"
      />
    );
  }

  return (
    <img
      src={`${filesBaseUrl}${thumbnailUrl}`}
      alt={row.values.title}
      width="36"
    />
  );
}

MediaCell.propTypes = {
  row: PropTypes.object
};
