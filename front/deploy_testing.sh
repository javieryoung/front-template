#/bin/bash

cp src/index.html src/index.default.html
sed -i -e 's/TITLE_GOES_HERE/Sauce/g' src/index.html

# copy bootstrap file (doesnt work in angular.json)
mv src/app/_bootstrap.scss src/app/_bootstrap.sauce.scss
cp src/platforms/SinergiaCampus/_bootstrap.scss src/app/_bootstrap.scss


#build


ng build --prod --configuration=SinergiaCampus
if [ $? -eq 0 ]; then

  ssh -i ../sauce.pem ubuntu@test.sauce.uy 'rm -r ~/dist'
  scp -r -i ../sauce.pem dist/ ubuntu@test.sauce.uy:~/dist
  ssh -i ../sauce.pem ubuntu@test.sauce.uy 'sudo rm -rf /var/www/html/front/* && sudo cp dist/front/* -rf /var/www/html/front/'

else
  echo 'Build error'
fi

# return the bootstrap to the original
mv src/app/_bootstrap.sauce.scss src/app/_bootstrap.scss

mv src/index.default.html src/index.html
