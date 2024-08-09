
// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---src-components-blog-post-js": preferDefault(require("/home/runner/work/mayankraj.com/mayankraj.com/src/components/blog-post.js")),
  "component---src-pages-404-js": preferDefault(require("/home/runner/work/mayankraj.com/mayankraj.com/src/pages/404.js")),
  "component---src-pages-blog-js": preferDefault(require("/home/runner/work/mayankraj.com/mayankraj.com/src/pages/blog.js")),
  "component---src-pages-index-js": preferDefault(require("/home/runner/work/mayankraj.com/mayankraj.com/src/pages/index.js")),
  "component---src-pages-resume-js": preferDefault(require("/home/runner/work/mayankraj.com/mayankraj.com/src/pages/resume.js")),
  "component---src-pages-resume-pdf-js": preferDefault(require("/home/runner/work/mayankraj.com/mayankraj.com/src/pages/resume.pdf.js")),
  "component---src-pages-schedule-call-js": preferDefault(require("/home/runner/work/mayankraj.com/mayankraj.com/src/pages/schedule-call.js"))
}

