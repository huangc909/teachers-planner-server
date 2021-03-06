# Teacher's Planner Server
Teacher's Planner Server is the backend API for the Teacher's Planner application. Using Express.js and Mongoose.js along with MongoDB as the database, data in the Teacher's Planner application is able to be created, retrieved, updated, and deleted.

## Links
- Application: (coming soon)
- Frontend Repo: https://github.com/huangc909/teachers-planner
- Backend Repo: https://github.com/huangc909/teachers-planner-server


## API Endpoints
### SchoolYears
| Verb   | URI Pattern                    | Controller#Action       |
|:-------|:-------------------------------|:------------------------|
| GET    | `/schoolYears`                 | `schoolYears#index`     |
| GET    | `/schoolYears/:schoolYearId`   | `schoolYears#show`      |
| POST   | `/schoolYears`                 | `schoolYears#create`    |
| PATCH  | `/schoolYears/:schoolYearId`   | `schoolYears#update`    |
| DELETE | `/schoolYears/:schoolYearId`   | `schoolYears#destroy`   |


### Months
| Verb   | URI Pattern                                    | Controller#Action  |
|:-------|:-----------------------------------------------|:-------------------|
| GET    | `/schoolYears/:schoolYearId/Months/:MonthId`   | `months#show`      |
| POST   | `/schoolYears/:schoolYearId/Months`            | `months#create`    |
| PATCH  | `/schoolYears/:schoolYearId/Months/:MonthId`   | `months#update`    |
| DELETE | `/schoolYears/:schoolYearId/Months/:MonthId`   | `months#destroy`   |


### Days
| Verb   | URI Pattern                                                | Controller#Action  |
|:-------|:-----------------------------------------------------------|:-------------------|
| GET    | `/schoolYears/:schoolYearId/Months/:MonthId/days/:dayId`   | `days#show`        |
| POST   | `/schoolYears/:schoolYearId/Months/:MonthId/days`          | `days#create`      |
| PATCH  | `/schoolYears/:schoolYearId/Months/:MonthId/days/:dayId`   | `days#update`      |
| DELETE | `/schoolYears/:schoolYearId/Months/:MonthId/days/:dayId`   | `days#destroy`     |


### Tasks
| Verb   | URI Pattern                                                                         | Controller#Action  |
|:-------|:------------------------------------------------------------------------------------|:-------------------|
| GET    | `/schoolYears/:schoolYearId/Months/:MonthId/days/:dayId/tasks/:taskId`              | `tasks#show`        |
| POST   | `/schoolYears/:schoolYearId/Months/:MonthId/days/:dayId/tasks`                      | `tasks#create`      |
| PATCH  | `/schoolYears/:schoolYearId/Months/:MonthId/days/:dayId/tasks/:taskId`              | `tasks#update`      |
| PATCH  | `/schoolYears/:schoolYearId/Months/:MonthId/days/:dayId/tasks/:taskId/checkmark`    | `tasks#update`      |
| DELETE | `/schoolYears/:schoolYearId/Months/:MonthId/sdays/:dayId/tasks/:taskId`             | `tasks#destroy`     |

## ERD
![teachers-planner-erd](https://user-images.githubusercontent.com/53062479/119353736-4337f880-bc71-11eb-8d35-3e7c4b6b1b45.png)
