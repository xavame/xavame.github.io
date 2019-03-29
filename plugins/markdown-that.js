const md = require('markdown-it')({
  html: true,
  linkify: true
})

md.use(require('markdown-it-highlightjs'), {
    auto: false
  })
  .use(require('markdown-it-katex'))
  .use(require('markdown-it-sup'))
  .use(require('markdown-it-sub'));

getAttr = (token, attr) => {
  let returnObj = token.attrs[token.attrIndex(attr)];
  return typeof returnObj !== "undefined" ? returnObj[1] : "";
}

setAttr = (tokens, idx, attr, value) => {
  if (tokens[idx].attrIndex(attr) < 0) {
    tokens[idx].attrPush([attr, value]);
  } else {
    tokens[idx].attrs[tokens[idx].attrIndex(attr)][1] = value;
  }
}

md.renderer.rules.image = function (tokens, idx, options, env, self) {
  let token = tokens[idx],
    text = token.content,
    href = getAttr(token, 'src');

  if(text==="embed:youtube"){
    tokens[idx]["tag"] = "embed-youtube";
    var ytRegEx = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/ig;
    let resultArr = ytRegEx.exec(href);
    var result = resultArr ? resultArr[1] : 'C0DPdy98e4c';
    setAttr(tokens, idx, 'id', result)
  }

  else if(text==="embed:twitter"){
    tokens[idx]["tag"] = "embed-twitter";
    setAttr(tokens, idx, 'id', href)
  }

  //IF AUDIO
  else if (["mp3", "wav", "ogg", "flac", "aiff", "mid", "aac", "wma", "alac", "ape"].some((s) => href.toLowerCase().endsWith(s))) {
    tokens[idx]["tag"] = "content-player";
    setAttr(tokens, idx, 'type', 'audio')
  }

  //IF IMAGE
  else if (["jpg", "jpeg", "webp", "gif", "png", "apng", "svg", "xbm", "bmp", "ico"].some((s) => href.toLowerCase().endsWith(s))) {
    tokens[idx]["tag"] = "figured-image";
    setAttr(tokens, idx, 'alt', text)
  }

  //IF VIDEO
  else if (["3gp", "avi", "mov", "mp4", "m4v", "m4a", "mkv", "ogv", "ogm", "oga"].some((s) => href.toLowerCase().endsWith(s))) {
    tokens[idx]["tag"] = "content-player";
    setAttr(tokens, idx, 'type', 'video')
  }

  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  tokens[idx]["tag"] = "md-link";
  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.link_close = function () {
  return '</md-link>'
}

module.exports = {
  md: (m) => {
    return md.render(m)
  }
}