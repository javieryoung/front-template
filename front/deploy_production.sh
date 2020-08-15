#/bin/bash

cp src/index.html src/index.default.html
sed -i -e 's/TITLE_GOES_HERE/Sauce/g' src/index.html

#build
ng build --prod
if [ $? -eq 0 ]; then

  ssh -i ../sauce.pem ubuntu@sauce.uy 'rm -r ~/dist'
  scp -r -i ../sauce.pem dist/ ubuntu@sauce.uy:~/dist
  ssh -i ../sauce.pem ubuntu@sauce.uy 'sudo rm -rf /var/www/html/front/* && sudo cp dist/front/* -rf /var/www/html/front/'

else
  echo 'Build error'
fi

mv src/index.default.html src/index.html