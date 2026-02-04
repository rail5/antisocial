# AntiSocial

![AntiSocial](./icon-128.png)

AntiSocial is a browser extension that hides "social media" features on certain websites.

It's incomplete, and website interfaces are perpetually changing.

Each component can be configured separately via the options page. E.g., you can choose to hide comments on YouTube but show view counts.

## How?

Simple CSS injection, not very sophisticated, sometimes downright hacky.

Under [content/css/](content/css/) are `.js` files for each individual website, that contain labeled selectors like this:

```json
comments: `.ytd-comments, #comments, [section-identifier*="comment"]`
```

The above example tells us that if we want to hide "comments", we can inject a CSS rule for the given selectors with `display none: !important;`

## Supported Sites

Feel free to open PRs for existing sites or to add new sites.

### AntiSocial YouTube

Capable of hiding:

 - Comments
 - Likes/dislikes
 - View counts
 - Subscriber counts
 - "Shorts"
 - Warnings & endorsements under news videos
 - Live chat & live chat replay
 - Community posts
 - Suggested video categories


### AntiSocial GitHub

Capable of hiding:

 - Star counts
 - Fork counts
 - "Watch" counts
 - Follower counts
 - Emoji reactions
 - Contribution graphs
 - Homepage "feed"
