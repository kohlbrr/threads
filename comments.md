# CODE REVIEW 1

## README
	- What's in a good readme?

## Tasks
	- Writing good tickets & user stories
	- 15 - 60 mins of work with
	- As specific as possible (GET ROUTE FOR PRODUCT not PRODUCT ROUTES)

## Routes
	- Great job writing tests (was it true TDD?)
	- Route tests - creating user classes in before Hook
	- Why {plain : true} in Order PUTs?
	- Is there a better way to isolate order from returned array in order.js line 33?
	- How can we protect user updated by user class/ auth status?
	- Conventional Statuses = 200 for GET, 201 for POST/PUT, 204 for DELETE

## Models
	- CartContents schema: why seperate table and not property of Cart?
	- Clothing === Item? Why not have it associated to reviews?
	- Sequelize.DECIMAL for price
	- Design associated with user as Designer?
	- hasMany vs belongsTo in models (hasMany adds relational ID, belongsTo gives instance Methods)
	- Nice job avoiding Sequelize.ARRAY