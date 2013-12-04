require 'rake/clean'

CLEAN.include(['*.html','*.css'])

HAML = FileList['src/*.haml']
HTML = HAML.pathmap("%{src/}X.html")
SCSS = FileList['src/*.scss']
CSS = SCSS.pathmap("%{src/}X.css")

rule( /\.html$/ => [
  proc {|tn| tn.sub(/\.html$/, '.haml').sub(/^/,'src/') }
]) do |t|
  sh "haml #{t.source} #{t.name}"
end

rule( /\.css$/ => [
  proc {|tn| tn.sub(/\.css$/, '.scss').sub(/^/,'src/') }
]) do |t|
  sh "sass #{t.source} #{t.name}"
end

desc "Build page and css"
task :default => HTML + CSS
