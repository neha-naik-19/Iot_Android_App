=(SUM('Vinayak Naik:Biju K R'!E2))/((IF('Vinayak Naik'!E2>0,1,0))+(IF('Ashwin Srinivasan'!E2>0,1,0))+(IF('Bharat Deshpande'!E2>0,1,0))+(IF('Neena Goveas'!E2>0,1,0))+(IF('Sanjay Sahay'!E2>0,1,0))+(IF('Snehanshu Saha'!E2>0,1,0))+(IF('Basabadatta Bhattacharya'!E2>0,1,0))+(IF('Biju K R'!E2>0,1,0)))


=(SUM('Vinayak Naik'!E2,'Ashwin Srinivasan'!E2,'Bharat Deshpande'!E2,'Neena Goveas'!E2,'Sanjay Sahay'!E2,'Snehanshu Saha'!E2,'Basabadatta Bhattacharya'!E2,'Biju K R'!E2))

=((IF('Vinayak Naik'!E2>0,1,0))+(IF('Ashwin Srinivasan'!E2>0,1,0))+(IF('Bharat Deshpande'!E2>0,1,0))+(IF('Neena Goveas'!E2>0,1,0))+(IF('Sanjay Sahay'!E2>0,1,0))+(IF('Snehanshu Saha'!E2>0,1,0))+(IF('Basabadatta Bhattacharya'!E2>0,1,0))+(IF('Biju K R'!E2>0,1,0)))




// Teaching Potential
=IFERROR(ROUND((SUM('Vinayak Naik'!E2,'Ashwin Srinivasan'!E2,'Bharat Deshpande'!E2,'Neena Goveas'!E2,'Sanjay Sahay'!E2,'Snehanshu Saha'!E2,'Basabadatta Bhattacharya'!E2,'Biju K R'!E2))/((IF('Vinayak Naik'!E2>0,1,0))+(IF('Ashwin Srinivasan'!E2>0,1,0))+(IF('Bharat Deshpande'!E2>0,1,0))+(IF('Neena Goveas'!E2>0,1,0))+(IF('Sanjay Sahay'!E2>0,1,0))+(IF('Snehanshu Saha'!E2>0,1,0))+(IF('Basabadatta Bhattacharya'!E2>0,1,0))+(IF('Biju K R'!E2>0,1,0))),2),"")


// Research Potential
=IFERROR(ROUND((SUM('Vinayak Naik'!G2,'Ashwin Srinivasan'!G2,'Bharat Deshpande'!G2,'Neena Goveas'!G2,'Sanjay Sahay'!G2,'Snehanshu Saha'!G2,'Basabadatta Bhattacharya'!G2,'Biju K R'!G2))/((IF('Vinayak Naik'!G2>0,1,0))+(IF('Ashwin Srinivasan'!G2>0,1,0))+(IF('Bharat Deshpande'!G2>0,1,0))+(IF('Neena Goveas'!G2>0,1,0))+(IF('Sanjay Sahay'!G2>0,1,0))+(IF('Snehanshu Saha'!G2>0,1,0))+(IF('Basabadatta Bhattacharya'!G2>0,1,0))+(IF('Biju K R'!G2>0,1,0))),2),"")


// Publications
=IFERROR(ROUND((SUM('Vinayak Naik'!I2,'Ashwin Srinivasan'!I2,'Bharat Deshpande'!I2,'Neena Goveas'!I2,'Sanjay Sahay'!I2,'Snehanshu Saha'!I2,'Basabadatta Bhattacharya'!I2,'Biju K R'!I2))/((IF('Vinayak Naik'!I2>0,1,0))+(IF('Ashwin Srinivasan'!I2>0,1,0))+(IF('Bharat Deshpande'!I2>0,1,0))+(IF('Neena Goveas'!I2>0,1,0))+(IF('Sanjay Sahay'!I2>0,1,0))+(IF('Snehanshu Saha'!I2>0,1,0))+(IF('Basabadatta Bhattacharya'!I2>0,1,0))+(IF('Biju K R'!I2>0,1,0))),2),"")


// Relevance of Research to the Department/Institute
=IFERROR(ROUND((SUM('Vinayak Naik'!K2,'Ashwin Srinivasan'!K2,'Bharat Deshpande'!K2,'Neena Goveas'!K2,'Sanjay Sahay'!K2,'Snehanshu Saha'!K2,'Basabadatta Bhattacharya'!K2,'Biju K R'!K2))/((IF('Vinayak Naik'!K2>0,1,0))+(IF('Ashwin Srinivasan'!K2>0,1,0))+(IF('Bharat Deshpande'!K2>0,1,0))+(IF('Neena Goveas'!K2>0,1,0))+(IF('Sanjay Sahay'!K2>0,1,0))+(IF('Snehanshu Saha'!K2>0,1,0))+(IF('Basabadatta Bhattacharya'!K2>0,1,0))+(IF('Biju K R'!K2>0,1,0))),2),"")


// Education & Background
=IFERROR(ROUND((SUM('Vinayak Naik'!M2,'Ashwin Srinivasan'!M2,'Bharat Deshpande'!M2,'Neena Goveas'!M2,'Sanjay Sahay'!M2,'Snehanshu Saha'!M2,'Basabadatta Bhattacharya'!M2,'Biju K R'!M2))/((IF('Vinayak Naik'!M2>0,1,0))+(IF('Ashwin Srinivasan'!M2>0,1,0))+(IF('Bharat Deshpande'!M2>0,1,0))+(IF('Neena Goveas'!M2>0,1,0))+(IF('Sanjay Sahay'!M2>0,1,0))+(IF('Snehanshu Saha'!M2>0,1,0))+(IF('Basabadatta Bhattacharya'!M2>0,1,0))+(IF('Biju K R'!M2>0,1,0))),2),"")


// Aptitude
=IFERROR(ROUND((SUM('Vinayak Naik'!O2,'Ashwin Srinivasan'!O2,'Bharat Deshpande'!O2,'Neena Goveas'!O2,'Sanjay Sahay'!O2,'Snehanshu Saha'!O2,'Basabadatta Bhattacharya'!O2,'Biju K R'!O2))/((IF('Vinayak Naik'!O2>0,1,0))+(IF('Ashwin Srinivasan'!O2>0,1,0))+(IF('Bharat Deshpande'!O2>0,1,0))+(IF('Neena Goveas'!O2>0,1,0))+(IF('Sanjay Sahay'!O2>0,1,0))+(IF('Snehanshu Saha'!O2>0,1,0))+(IF('Basabadatta Bhattacharya'!O2>0,1,0))+(IF('Biju K R'!O2>0,1,0))),2),"")


// Attitude
=IFERROR(ROUND((SUM('Vinayak Naik'!Q2,'Ashwin Srinivasan'!Q2,'Bharat Deshpande'!Q2,'Neena Goveas'!Q2,'Sanjay Sahay'!Q2,'Snehanshu Saha'!Q2,'Basabadatta Bhattacharya'!Q2,'Biju K R'!Q2))/((IF('Vinayak Naik'!Q2>0,1,0))+(IF('Ashwin Srinivasan'!Q2>0,1,0))+(IF('Bharat Deshpande'!Q2>0,1,0))+(IF('Neena Goveas'!Q2>0,1,0))+(IF('Sanjay Sahay'!Q2>0,1,0))+(IF('Snehanshu Saha'!Q2>0,1,0))+(IF('Basabadatta Bhattacharya'!Q2>0,1,0))+(IF('Biju K R'!Q2>0,1,0))),2),"")


// Overall Rating
=IFERROR(ROUND((SUM('Vinayak Naik'!T2,'Ashwin Srinivasan'!T2,'Bharat Deshpande'!T2,'Neena Goveas'!T2,'Sanjay Sahay'!T2,'Snehanshu Saha'!T2,'Basabadatta Bhattacharya'!T2,'Biju K R'!T2))/((IF('Vinayak Naik'!T2>0,1,0))+(IF('Ashwin Srinivasan'!T2>0,1,0))+(IF('Bharat Deshpande'!T2>0,1,0))+(IF('Neena Goveas'!T2>0,1,0))+(IF('Sanjay Sahay'!T2>0,1,0))+(IF('Snehanshu Saha'!T2>0,1,0))+(IF('Basabadatta Bhattacharya'!T2>0,1,0))+(IF('Biju K R'!T2>0,1,0))),2),"")