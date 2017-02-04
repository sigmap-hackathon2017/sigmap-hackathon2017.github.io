#!/usr/bin/python
# coding: utf-8

import sys, getopt
import csv
import os
import datetime

def main(argv):
    inputFile = ''
    
    try:
        opts, args = getopt.getopt(argv,"hi:",["help","input="])
    except getopt.GetoptError:
        print 'generate_odyssey.py -i <inputfile>'
        sys.exit(2)
    for opt, arg in opts:
        if opt == '-h':
            print 'generate_odyssey.py -i <inputfile>'
            sys.exit()
        elif opt in ("-i", "--input"):
            inputFile = arg
    #print 'Input file is "', inputFile
    

    with open(inputFile, 'rb') as f:
        reader = csv.reader(f, delimiter=';', quoting=csv.QUOTE_NONE)
        
        zoneLabel = ''
        
        homeItemMd = []
        chapterMd = []
        
        # All travels
        for row in reader:
            if row[0] == "REF.":
                continue
            
            travelId = row[0]
            travelStart = row[1]
            travelStartDate = datetime.datetime.strptime(travelStart, '%d/%m/%Y')
            travelEnd = row[2]
            travelEndDate = datetime.datetime.strptime(travelEnd, '%d/%m/%Y')
            travelTargetCity = row[3]
            travelTargetCountry = row[4]
            travelObject = row[5]
            travelGeoY = row[6]
            travelGeoX = row[7]
            travelZone = row[8]
            travelStakeHolder = row[9]
            travelMeetingType = row[10]
            travelGeoCompl = row[11]
            travelZoneCompl = row[12]
            travelObjectCompl = row[13]
            travelDescription = row[14]
            travelLink = row[15]
            travelLinkCompl = row[16]
            travelImage = row[17]
            travelImageTitle = row[18]
            zoneLabel = travelZoneCompl        
            
            # Build chapter
            chapterMd.append("#{0}".format(travelObjectCompl))
            chapterMd.append("```")
            chapterMd.append("-center: [{0}, {1}]".format(travelGeoY,travelGeoX))
            chapterMd.append("-zoom: 7")
            chapterMd.append("L.marker([{0}, {1}]).actions.addRemove(S.map)".format(travelGeoY,travelGeoX))
            chapterMd.append("```")
            chapterMd.append("")
            chapterMd.append("{0}, {1}, {2}".format(travelTargetCity,travelTargetCountry, travelStart))
            
            ## Image
            if len(travelImage) != 0:
                chapterMd.append("![{0}]({1})".format(travelImageTitle, travelImage))
            
            ## Description
            if len(travelDescription) != 0:
                chapterMd.append("")
                chapterMd.append(travelDescription)
            
            ## Link
            if len(travelLink) != 0:
                chapterMd.append("")
                if len(travelLinkCompl) != 0:
                    chapterMd.append("[{0}]({1})".format(travelLinkCompl, travelLink))
                else:
                    chapterMd.append("[{0}]({0})".format(travelLink))
            chapterMd.append("")
            
            # Complete homeChapter
            homeItemMd.append("")
            homeItemMd.append("* {0} - {1}, {2}, {3}".format(travelStart, travelObjectCompl, travelTargetCity, travelTargetCountry))
            homeItemMd.append("")
            homeItemMd.append("```")
            homeItemMd.append("L.marker([{0}, {1}]).actions.addRemove(S.map)".format(travelGeoY,travelGeoX))
            homeItemMd.append("```")
            
        homeMd = []
        homeMd.append("#{0}".format(zoneLabel))
        homeMd.append("```")
        homeMd.append("- center: [{0}, {1}]".format("0.0","0.0"))
        homeMd.append("- zoom: 3")
        homeMd.append("```")
        print "{0}".format('\n'.join(homeMd))
        print "{0}".format('\n'.join(homeItemMd))
        
        #templateFile = open ('odyssey.template01.html', 'rb')
        #htmlOdysseyTemplate = templateFile.read()
        #templateFile.close()
        # Gen odyssey.html
        #print htmlOdysseyTemplate
        print "{0}".format('\n'.join(chapterMd))
        #print "</script></body></html>"


if __name__ == "__main__":
    main(sys.argv[1:])

