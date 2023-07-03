function getChildren(node, skipMe) {
  const children = [];
  // eslint-disable-next-line no-param-reassign
  for (; node; node = node.nextSibling) {
    if (node.nodeType === 1 && node !== skipMe) {
      children.push(node);
    }
  }
  return children;
}

HTMLElement.prototype.siblings = function () {
  return getChildren(this.parentNode.firstChild, this);
};
