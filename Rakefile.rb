desc "Parse haml"
task :parse_haml do
  puts "Parsing .haml"
  system(%{
    cd src/ &&
    for f in *.haml; do [ -e $f ] && haml $f ../${f%.haml}.html; done
  })
  puts "Done parsing haml"
end

desc "Parse scss"
task :parse_scss do
  puts "Parsing .scss"
  system(%{
    cd src/ &&
    for f in *.scss; do [ -e $f ] && sass $f ../${f%.scss}.css; done
  })
  puts "Done parsing scss."
end

desc "Build page and css"
task :default do
  Rake::Task[:parse_haml].invoke
  Rake::Task[:parse_scss].invoke
end

desc "Clean"
task :clean do
  puts "Cleaning..."
  system(%{rm -f *.html *.css})
  puts "Done cleaning"
end
