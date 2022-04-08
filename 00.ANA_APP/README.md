# ANA
You need to have a working `Python >= 3.7 ` and a `Django >= 4.0.3` VEnv for the Back End with `Angular CLI >= 13.2.5` for the Front End. We are using `Tailwind >= 3.0.23` for the CSS. 


## Back End (Django)

Inside the `BETA_NODE/00.ANA_APP/BE_ANA/` folder do the following:
1-`pip install -r requirements.txt`. 
2-`python .\manage.py makemigrations`.
3-`python .\manage.py migrate`.
4-`python .\manage.py createsuperuser`.
5-`python.exe .\manage.py runserver`.

Navigate to `http://localhost:8000/`. 

Then log in with the account created on step 4 for the Django Admin Interface, and you can get the API documentation and run tests on the following URL:  `http://localhost:8000/api/schema/swagger-ui/`

## Front End (Angular)

Inside the `BETA_NODE/00.ANA_APP/FE_ANA/` folder do the following:
1-`npm install`. 
2-`ng serve`.

Navigate to `http://localhost:4200/`.

You can create accounts to test by going to `http://localhost:4200/register` or by navigating the dropdown on the Landing Page.
