var studentsJSON = [
  {
    "total": 35421,
    "missed": 2064,
    "passed": 3279,
    "session": 3380,
    "failed": 18535,
    "eliminated": 10227,
    "offices": 95,
    "year": "2009"
  },
  {
    "total": 28540,
    "missed": 2125,
    "passed": 3536,
    "session": 3557,
    "failed": 14690,
    "eliminated": 4636,
    "year": "2010"
  },
  {
    "total": 30058,
    "missed": 2450,
    "female": "41.98%",
    "male": "-",
    "public": "14.54%",
    "private": "28.08%",
    "free": "57.37%",
    "passed": 3021,
    "session": 3193,
    "failed": 20802,
    "eliminated": 592,
    "offices": 79,
    "nkcOffices": 52,
    "year": "2011"
  },
  {
    "total": 31280,
    "female": "42,85%",
    "public": "25,58%",
    "private": "35,48%",
    "free": "38,95%",
    "passed": 2848,
    "session": 3118,
    "offices": 88,
    "nkcOffices": 50,
    "year": "2012",
    "failed": 25314
  },
  {
    "total": 35492,
    "female": "43,95%",
    "public": "29.88",
    "private": "38.98",
    "free": "-",
    "passed": 3152,
    "session": 3455,
    "failed": 28885,
    "passedSession": 2533,
    "list": [],
    "link": "http://fr.alakhbar.info/6989-0-Mauritanie-35492-candidats-se-penchent-sur-les-epreuves-du-Bac.html",
    "note": "http://www.afrik.com/mauritanie-35-492-candidats-passent-le-bac; 35,492 candidates including 43.95% of girls (and 76 candidates for technical Bac) address from Monday, June 17, on the Baccalaureate in 2013 in Mauritania, according Alakhbar.info . Exams are held in 95 centers, including 54 centers in Nouakchott and 41 in the provinces (regions) of the interior, according to the exam department at the Ministry of Education. 29.88% of the candidates came from the public, private 38.98% and 31.15% other candidates are free, with an increase in the number of candidates up to 4150 candidates compared to last year.",
    "year": "2013"
  },
  {
    "total": 41621,
    "offices": 106,
    "male": 9984,
    "female": 7567,
    "list": [],
    "year": "2014"
  }
];

var students = {
    x: {
        title: 'Years',
        data: _.pluck(studentsJSON, 'year')
    },
    total: {
        title: 'عدد المشاركين',
        data: _.pluck(studentsJSON, 'total')
    },
    failed: {
        title: 'عدد الراسبين',
        data: _.compact(_.map(studentsJSON, function (d) {return d.passed ? d.total - d.passed - d.session : null;}))
    },
    passed: {
        title: 'عدد الناجحين',
        data: _.compact(_.pluck(studentsJSON, 'passed'))
    },
    session: {
        title: 'عدد المتأهلين للدورة',
        data: _.compact(_.pluck(studentsJSON, 'session'))
    }
};