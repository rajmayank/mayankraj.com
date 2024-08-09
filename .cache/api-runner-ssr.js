var plugins = [{
      name: 'gatsby-plugin-image',
      plugin: require('/home/runner/work/mayankraj.com/mayankraj.com/.yarn/__virtual__/gatsby-plugin-image-virtual-f849e9283e/4/.yarn/berry/cache/gatsby-plugin-image-npm-3.13.1-b98f59f6b2-10c0.zip/node_modules/gatsby-plugin-image/gatsby-ssr.js'),
      options: {"plugins":[]},
    },{
      name: 'gatsby-plugin-react-helmet',
      plugin: require('/home/runner/work/mayankraj.com/mayankraj.com/.yarn/__virtual__/gatsby-plugin-react-helmet-virtual-98ff1d7d97/4/.yarn/berry/cache/gatsby-plugin-react-helmet-npm-6.13.1-23bfc1113e-10c0.zip/node_modules/gatsby-plugin-react-helmet/gatsby-ssr.js'),
      options: {"plugins":[]},
    },{
      name: 'gatsby-plugin-sitemap',
      plugin: require('/home/runner/work/mayankraj.com/mayankraj.com/.yarn/__virtual__/gatsby-plugin-sitemap-virtual-645785ddc2/4/.yarn/berry/cache/gatsby-plugin-sitemap-npm-6.13.1-79cb3c836b-10c0.zip/node_modules/gatsby-plugin-sitemap/gatsby-ssr.js'),
      options: {"plugins":[],"output":"/","createLinkInHead":true,"entryLimit":45000,"query":"{ site { siteMetadata { siteUrl } } allSitePage { nodes { path } } }","excludes":[]},
    },{
      name: 'gatsby-plugin-google-analytics',
      plugin: require('/home/runner/work/mayankraj.com/mayankraj.com/.yarn/__virtual__/gatsby-plugin-google-analytics-virtual-a31195b70a/4/.yarn/berry/cache/gatsby-plugin-google-analytics-npm-5.13.1-b252bbe12e-10c0.zip/node_modules/gatsby-plugin-google-analytics/gatsby-ssr.js'),
      options: {"plugins":[],"trackingId":"UA-89686348-1","head":false,"anonymize":false,"respectDNT":false,"exclude":[],"pageTransitionDelay":0,"enableWebVitalsTracking":false},
    },{
      name: 'gatsby-plugin-manifest',
      plugin: require('/home/runner/work/mayankraj.com/mayankraj.com/.yarn/__virtual__/gatsby-plugin-manifest-virtual-d83a946423/4/.yarn/berry/cache/gatsby-plugin-manifest-npm-5.13.1-2036e9f84e-10c0.zip/node_modules/gatsby-plugin-manifest/gatsby-ssr.js'),
      options: {"plugins":[],"icon":"src/assets/images/favicon.png","name":"Mayank Raj","short_name":"MayankRaj","start_url":"/","background_color":"#ffffff","theme_color":"#663399","display":"minimal-ui","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"30fe4319df15291de2295672014eed15"},
    },{
      name: 'gatsby-plugin-google-fonts-with-attributes',
      plugin: require('/home/runner/.yarn/berry/cache/gatsby-plugin-google-fonts-with-attributes-npm-1.0.8-aad093f00e-10c0.zip/node_modules/gatsby-plugin-google-fonts-with-attributes/gatsby-ssr.js'),
      options: {"plugins":[],"fonts":["Overpass|Fredoka+One|Courgette"],"display":"swap","attributes":{"rel":"stylesheet preload prefetch"}},
    },{
      name: 'gatsby-plugin-feed',
      plugin: require('/home/runner/work/mayankraj.com/mayankraj.com/.yarn/__virtual__/gatsby-plugin-feed-virtual-8ca52225cc/4/.yarn/berry/cache/gatsby-plugin-feed-npm-5.13.1-226dccc676-10c0.zip/node_modules/gatsby-plugin-feed/gatsby-ssr.js'),
      options: {"plugins":[],"query":"\n          {\n            site {\n              siteMetadata {\n                title\n                description\n                siteUrl\n                site_url: siteUrl\n              }\n            }\n          }\n        ","feeds":[{"query":"\n              {\n                allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {\n                  edges {\n                    node {\n                      excerpt\n                      html\n                      fields { slug }\n                      frontmatter { title\n                        date\n                        page_slug\n                      }\n                    }\n                  }\n                }\n              }\n            ","output":"/rss.xml","title":"RSS Feed | Mayank Raj"}]},
    },{
      name: 'gatsby-plugin-preload-fonts',
      plugin: require('/home/runner/work/mayankraj.com/mayankraj.com/.yarn/__virtual__/gatsby-plugin-preload-fonts-virtual-6a30d135b1/4/.yarn/berry/cache/gatsby-plugin-preload-fonts-npm-4.13.1-f8b073123b-10c0.zip/node_modules/gatsby-plugin-preload-fonts/gatsby-ssr.js'),
      options: {"plugins":[]},
    },{
      name: 'partytown',
      plugin: require('/home/runner/work/mayankraj.com/mayankraj.com/.yarn/unplugged/gatsby-virtual-f3298c7560/node_modules/gatsby/dist/internal-plugins/partytown/gatsby-ssr.js'),
      options: {"plugins":[]},
    }]
/* global plugins */
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

function augmentErrorWithPlugin(plugin, err) {
  if (plugin.name !== `default-site-plugin`) {
    // default-site-plugin is user code and will print proper stack trace,
    // so no point in annotating error message pointing out which plugin is root of the problem
    err.message += ` (from plugin: ${plugin.name})`
  }

  throw err
}

export function apiRunner(api, args, defaultReturn, argTransform) {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  const results = []
  plugins.forEach(plugin => {
    const apiFn = plugin.plugin[api]
    if (!apiFn) {
      return
    }

    try {
      const result = apiFn(args, plugin.options)

      if (result && argTransform) {
        args = argTransform({ args, result })
      }

      // This if case keeps behaviour as before, we should allow undefined here as the api is defined
      // TODO V4
      if (typeof result !== `undefined`) {
        results.push(result)
      }
    } catch (e) {
      augmentErrorWithPlugin(plugin, e)
    }
  })

  return results.length ? results : [defaultReturn]
}

export async function apiRunnerAsync(api, args, defaultReturn, argTransform) {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  const results = []
  for (const plugin of plugins) {
    const apiFn = plugin.plugin[api]
    if (!apiFn) {
      continue
    }

    try {
      const result = await apiFn(args, plugin.options)

      if (result && argTransform) {
        args = argTransform({ args, result })
      }

      // This if case keeps behaviour as before, we should allow undefined here as the api is defined
      // TODO V4
      if (typeof result !== `undefined`) {
        results.push(result)
      }
    } catch (e) {
      augmentErrorWithPlugin(plugin, e)
    }
  }

  return results.length ? results : [defaultReturn]
}
