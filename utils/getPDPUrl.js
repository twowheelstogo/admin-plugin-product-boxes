/**
 * Get a url for a product's PDP page given a product object
 * @param {Object} args - the method's arguments
 * @param {String} args.bundleId - A product id
 * @param {String} args.variantId - A variant or option id
 * @param {String} args.parentVariantId - A parent variant id of the second argument
 * @param {String} args.shopId - A shop ID
 * @returns {String} A relative Url to the product's detail page
 */
export default function getPDPUrl({ bundleId, variantId, parentVariantId, shopId, productId }) {
  let url = `/${shopId}/`;

  if (variantId && parentVariantId) {
    // Option
    url = `${url}bundles/${bundleId}/${parentVariantId}/${variantId}`;
  } else if (productId && variantId) {
    // Variant
    url = `${url}bundles/${bundleId}/${productId}/${variantId}`;
  } else if (productId) {
    url = `${url}bundles/${bundleId}/${productId}`;
  } else {
    url = `${url}bundles/${bundleId}`;
  }

  return url;
}
