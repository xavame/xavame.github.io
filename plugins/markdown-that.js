const md = require('markdown-it')({
  html: true,
  linkify: true
})

md.use(require('markdown-it-highlightjs'), {
  auto:false
})
.use(require('markdown-it-katex'))
.use(require('markdown-it-sup'))
.use(require('markdown-it-sub'));

getAttr = (token, attr) => {
  let returnObj = token.attrs[token.attrIndex(attr)];
  return typeof returnObj !== "undefined" ? returnObj[1] : "";
}

md.renderer.rules.image = function (tokens, idx, options, env, self) {
  var token = tokens[idx],
      href = getAttr(token, 'src'),
      text = getAttr(token, 'alt'),
      title = getAttr(token, 'title');

  //IF AUDIO
  let audioFiles = ["mp3", "wav", "ogg", "flac", "aiff", "mid", "aac", "wma", "alac", "ape"]
  if (audioFiles.some((s) => href.toLowerCase().endsWith(s))) {
      return ('<div class="audioplayer"><audio preload="true"><source src="' + href + '"></audio><button class="p"><div class="b"></div></button><div class="l"><div class="d"></div></div></div>')
  }

  let modern = '';
  let classes = title;
  return (title ? "<figure class='" + title + "'>" : "") + '<image-responsive class="' + classes + '" imageURL="' + href + '" alt="' + text + '" title="' + text + '" ' + modern + '>' + ((title && text) ? "<figcaption>" + text + "</figcaption></figure>" : "</figure>")
};

var defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  // If you are sure other plugins can't add `target` - drop check below
  var aIndex = tokens[idx].attrIndex('target');
  var hIndex = tokens[idx].attrIndex('href');
  let t = tokens[idx].attrs[hIndex][1].startsWith("/") ? '_self' : '_blank'

  if (aIndex < 0) {
    tokens[idx].attrPush(['target', t]); // add new attribute
  } else {
    tokens[idx].attrs[aIndex][1] = t;    // replace value of existing attr
  }
  // pass token to default renderer.
  return defaultRender(tokens, idx, options, env, self);
};


module.exports = {
  md: (m) => {
    return md.render(m)
  }
}