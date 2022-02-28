from flask import Flask, render_template, request, redirect, url_for, jsonify,make_response,session,send_file
import pyodbc
import json
import decimal


class Encoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, decimal.Decimal): return float(obj)
        
class create_dict(dict): 
  
    # __init__ function 
    def __init__(self): 
        self = dict() 
          
    # Function to add key:value 
    def add(self, key, value): 
        self[key] = value

server = "172.30.2.2"
port = 5432
database = "test2"
username = "sa"
password = "p@ssw0rd"



app = Flask(__name__)
    

@app.route('/Data_API',methods=["GET", "POST"]) 
def Data_API():
    '''
    if request.method == "POST":
        cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+ password)
        workMachine = cnxn.cursor()
        workMachine.execute('SELECT BATCH_ID,PRODUCT_ID,RECIPE_ID,LOT_ID,BATCH_WEIGHT,START_TIME ,PREWEIGH_STATUS FROM test.dbo.BATCH_HEADER where BATCH_STATUS = 6 or BATCH_STATUS = 7 order by START_TIME  asc')
        payload = []
        content = {}
        for result in workMachine:
            content = {'BATCH_ID': result[0], 'PRODUCT_ID': str(result[1]), 'RECIPE_ID': result[2],'LOT_ID': result[3],'BATCH_WEIGHT': str(result[4]),'START_TIME ': str(result[5]),'PREWEIGH_STATUS': str(result[6])}
            payload.append(content)
            content = {}
        #print(payload)
        return json.dumps({"data":payload}, cls = Encoder), 201
    '''
    print("OKTETs")
    try:
        print("OKTETs TRY")
        draw = None
        row = None
        rowperpage = None
        searchValue = None
        
        cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+ password)
        data = cnxn.cursor()
        if request.method == 'POST':
            draw = request.form['draw'] 
            row = int(request.form['start'])
            min = request.form['min']
            max = request.form['max']
            
            
           
            SQLmin = ''
            SQLmax = ''
            if min == '1':
                SQLmin = ''
            else:
                datamin = min + " 00:00:00"
                SQLmin = " AND START_TIME >= '" + datamin + "'"

            if max == '1':
                SQLmax = ''
            else:
                datamax = max + " 23:59:59"
                SQLmax = " AND START_TIME <= '" + datamax + "'"
            
            
            rowperpage = int(request.form['length'])
        
           
            searchValue = request.form["search[value]"]
            print("draw",draw)
            print("row",row)
            print("rowperpage",rowperpage)
            print("searchValue",searchValue)
            
           
 
            ## Total number of records without filtering
            print("select count(*) as allcount from test2.dbo.BATCH_HEADER WHERE BATCH_STATUS = 6 or BATCH_STATUS = 7 " + SQLmin + SQLmax)
            data.execute("select count(*) as allcount from test2.dbo.BATCH_HEADER WHERE BATCH_STATUS = 6 or BATCH_STATUS = 7 " + SQLmin + SQLmax)
            print("ch 1 ")
            rsallcount = data.fetchone()
            print("ch 2 ")
           
            print("fff")
            totalRecords = rsallcount[0]
            
            if rowperpage == -1 :
                rowperpage = totalRecords
            else:
                pass
            
            
            print("Ok1")
            print(totalRecords) 
            print("Ok1")
 
            ## Total number of records with filtering
            likeString = "%" + searchValue +"%"
            print("SELECT count(*) as allcount from test2.dbo.BATCH_HEADER WHERE ())BATCH_STATUS = 6 or BATCH_STATUS = 7)" + SQLmin + SQLmax)
            data.execute("SELECT count(*) as allcount from test2.dbo.BATCH_HEADER WHERE (BATCH_STATUS = 6 or BATCH_STATUS = 7)" + SQLmin + SQLmax)
            rsallcount = data.fetchone()
            print("ok -- >")
            totalRecordwithFilter = rsallcount[0]
            print(totalRecordwithFilter) 
            print("Ok2")
            
            ## Fetch records
            if searchValue=='':
                print("SELECT BATCH_ID,PRODUCT_ID,RECIPE_ID,LOT_ID,BATCH_WEIGHT,START_TIME ,PREWEIGH_STATUS FROM test2.dbo.BATCH_HEADER WHERE (BATCH_STATUS = 6 or BATCH_STATUS = 7) " + SQLmin + SQLmax + "ORDER BY START_TIME  asc OFFSET ? ROWS FETCH NEXT ? ROWS ONLY", (row, rowperpage))
                #data.execute("SELECT BATCH_ID,PRODUCT_ID,RECIPE_ID,LOT_ID,BATCH_WEIGHT,START_TIME ,PREWEIGH_STATUS FROM test2.dbo.BATCH_HEADER WHERE (BATCH_STATUS = 6 or BATCH_STATUS = 7) " + SQLmin + SQLmax + "ORDER BY START_TIME  asc OFFSET ? ROWS FETCH NEXT ? ROWS ONLY", (row, rowperpage))
                
                data.execute("SELECT BATCH_ID,PRODUCT_ID,RECIPE_ID,LOT_ID,BATCH_WEIGHT,START_TIME ,PREWEIGH_STATUS FROM (SELECT BATCH_ID,PRODUCT_ID,RECIPE_ID,LOT_ID,BATCH_WEIGHT,START_TIME ,PREWEIGH_STATUS ,ROW_NUMBER() OVER (ORDER BY START_TIME) AS Seq FROM BATCH_HEADER WHERE (BATCH_STATUS = 6 or BATCH_STATUS = 7)  AND BATCH_ID IS NOT NULL " + SQLmin + SQLmax+")t WHERE  Seq BETWEEN ? AND ?"  + SQLmin + SQLmax , (row, str(int(rowperpage) + int(row))))
                
                employeelist = data.fetchall()
                print("Ok Sea")
            else:        
                data.execute("SELECT BATCH_ID,PRODUCT_ID,RECIPE_ID,LOT_ID,BATCH_WEIGHT,START_TIME ,PREWEIGH_STATUS FROM test2.dbo.BATCH_HEADER WHERE (BATCH_STATUS = 6 or BATCH_STATUS = 7 ) AND BATCH_ID LIKE ? OR PRODUCT_ID LIKE ? OR RECIPE_ID LIKE ? OR LOT_ID LIKE ? OR BATCH_WEIGHT LIKE ? OR START_TIME  LIKE ? OFFSET ? ROWS FETCH NEXT ? ROWS ONLY ", (likeString, likeString, likeString,likeString, likeString, likeString,row, rowperpage))
                employeelist = data.fetchall()
                print("Ok No Sea")
 
            data = []
            print("Ok FFFFF")
           
            for row in employeelist:
                data.append({
                    '1':row[0],
                    'BATCH_ID': row[0],
                    'PRODUCT_ID': row[1],
                    'RECIPE_ID': row[2],
                    'LOT_ID': row[3],
                    'BATCH_WEIGHT': row[4],
                    'START_TIME ': str(row[5]),
                    'PREWEIGH_STATUS' : row[6]
                })
 
            response = {
                'draw': draw,
                'iTotalRecords': totalRecords,
                'iTotalDisplayRecords': totalRecordwithFilter,
                'aaData': data,
            }
            return jsonify(response)
    except Exception as e:
        
        print(e)
    finally:
        cnxn.close() 
    

@app.route('/index')
@app.route('/')
def index():
    
    return render_template('DataTableShift.html')

@app.route('/delData',methods=["GET", "POST"]) 
def delData():
    new_data = []
    if request.method == "POST":
        print("Data del")
        for list_type in request.form.keys():
            list = request.form.getlist(list_type)
        for string in list:
            new_string = string.replace(" ", "")
            new_data.append(new_string)

        
         
        print(new_data)
        dataAll = "BATCH_ID = '" + new_data[0] + "'"
        for i in range(1,len(new_data)):
            dataAll += " OR BATCH_ID = '" + new_data[i] + "'"
        
       
        print("DELETE FROM test2.dbo.BATCH_HEADER WHERE " + dataAll)
        sqlDel = "DELETE FROM test2.dbo.BATCH_HEADER WHERE " + dataAll
        cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+ password)
        data = cnxn.cursor()
        data.execute(sqlDel)
        cnxn.commit()
    return redirect(url_for('index'))

#-------------------- main --------------------------------------

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True ,port=5001)