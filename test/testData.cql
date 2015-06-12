// Create the test users
create (gal:User { username: 'gal', fullName: 'Gal Schlezinger', password: '123', facebookId: '123' })
create (kfir:User { username: 'kfir', fullName: 'Kfir Strikovsky', password: '123', facebookId: '123' })
create (omri:User { username: 'omri', fullName: 'Omri Lachman', password: '123', facebookId: '123' })
create (avihay:User { username: 'avihay', fullName: 'Avihay Shem-Tov', password: '123', facebookId: '123' })
create (golan:User { username: 'golan', fullName: 'Golan Levi', password: '123', facebookId: '123' })
create (test:User { username: 'test', fullName: 'Test the Tester', password: '123', facebookId: '123' })

// Create the meetups
create (hackgeny:Meetup {name:'Hack Gen Y', location: 'Even Yehuda'})

// Create the Fliques
create (gal)-[:FLIQUED]->(f1:Flique {date: '12/06/2015'})<-[:FLIQUED]-(kfir)
create (f1)-[:HAPPENED_IN]->(hackgeny)
create (gal)-[:FLIQUED]->(f2:Flique {date: '12/06/2015'})<-[:FLIQUED]-(omri)
create (f2)-[:HAPPENED_IN]->(hackgeny)
create (avihay)-[:FLIQUED]->(f3:Flique {date: '12/06/2015'})<-[:FLIQUED]-(golan)
create (f3)-[:HAPPENED_IN]->(hackgeny)