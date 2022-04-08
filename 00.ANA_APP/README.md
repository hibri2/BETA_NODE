# ANA

This is a simple JWT enabled authentication and authorisation app that can be easily integrated with your projects.  One of the design principles is to have the app users separated from the Django Admin Users (Admin Interface).  The users will authenticate with their email, instead of a username, and we added 2FA.

This is a work in progress and we will be working on this to improve its functionalities, adding SSO with Microsoft Network, for example.

Most of the code for the ANA module had been done as part of the excellent course: [The Ultimate Authentication Course with Django and Angular] (https://www.udemy.com/course/angular-django-authentication/) by `Antonio Papa`.   The Tailwind / Angular code was heavily assisted by the [Notus Angular Tailwind Tool Kit]  (https://www.creative-tim.com/product/notus-angular) by [Creative Tim] (www.creative-tim.com).


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
