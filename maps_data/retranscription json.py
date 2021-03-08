#for fileNo in range(1,16):

f = open("eurovelo" + str(19) + ".json", "r")
f.read(2)
print(f.read(8))
f.read(3);
lat = []
long = []
while True :
    if(f.read(1) == '}') :
        break
    while f.read(1) != ':':
        continue
    i = f.read(1)
    s = ""
    while i != ',':
        if i== '}' :
            #s+=i
            lat.append(s)
            break
        s+=i
        i = f.read(1)
    if (i == '}'):
        #s+=i
        #lat.append(s)    
        break
    lat.append(s)
print(lat[-1])
f.read(2)
print(f.read(9))
print(f.read(3))
while True :
    if(f.read(1) == '}') :
        break
    while f.read(1) != ':':
        continue
    i = f.read(1)
    s = ""
    while i != ',':
        if i== '}' :
            #s+=i
            long.append(s)
            break
        s+=i
        i = f.read(1)
    if (i == '}'):
        #s+=i
        #lat.append(s)    
        break
    long.append(s)
f.close()
print(long[0])
print(long[-1])

with open("eurovelo" + str(19) + ".js", "w") as w:

    w.write("export default function getRoad() { return [\n")
    for i in range(len(lat)-1):
        w.write("    {latitude:" + lat[i]+", longitude:"+ long[i] +"},\n")
    w.write("    {latitude:" + lat[-1]+", longitude:"+ long[-1] +"}]\n")
    w.write("    }")


