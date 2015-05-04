REM git pull
SET MESSAGE=%1
IF [%1]==[] SET MESSAGE= "update site"
git status
git add -A
git commit -m %MESSAGE%
git checkout gh-pages
git merge master
git checkout master
git push origin --all
git status