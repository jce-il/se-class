git status
git add -A
git commit -m "update site"
git checkout gh-pages
git merge master
git checkout master
git push origin --all
git status