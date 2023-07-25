export const colorComponent = (className) => {
  let elems = document.getElementsByClassName(className);
  for (var i = 0; i < elems.length; i++) {
    const attributeNodeArray = [...elems[0].attributes];
    const attrs = attributeNodeArray.reduce((attrs, attribute) => {
      attrs[attribute.name] = attribute.value;
      return attrs;
    }, {});
    let elem = elems[i];
    let children = [elem];
    let queue = [elem];

    while (queue.length > 0) {
      let curr = queue.pop();
      if (curr.childNodes.length > 0) {
        children = [...children, ...curr.childNodes];
        queue = [...queue, ...curr.childNodes];
      }
    }
    for (var j = 0; j < children.length; j++) {
      if (attrs.color) {
        if (children[j].style) {
          children[j].style.color = attrs.color;
          children[j].style.borderColor = attrs.color;
        }
      }
    }
  }
};
