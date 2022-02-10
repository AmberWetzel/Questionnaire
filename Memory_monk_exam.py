import pandas as pd
import time
print("Testing 123...  try typing something and then press enter to show that you understand how to use this program...")
y=input()
print('You seem to have typed "'+str(y)+'" is this correct? (type Y or N)')

z=input()

if z=="N":
    print("Something seeems to not be working. Please stop and ask July for help")
    k=input()
elif z!="Y":
    print("You were unsucessful in following the simple instructions to type a single specific letter")
    print("Please stop and take a moment to contemplate where you went wrong in your life, then ask July for help")
    k=input()
else:
    print("Awesome, things seem to be working, now on to the D&D...")
    print('')
    print('')
    print('')
    print('')
    time.sleep(5)
    print("""As soon as you touch the sphere you can no longer sense anything, you are in a blank black space.  A voice asks you...""")


    question_list=["What is your name?","What is your quest?","What is your favorite color?",
                   "What's the name of the person who matters most to you in the entire world?",
                   "What do you know is true without a doubt?","Are you sure?","What do you really know about the quest you mentioned earlier?",
                   "Are you willing to do anything to succeed on your quest? (type Y or N)", "Even hurt the person you care for most? (type Y or N)",
                   "Is there a deity who you follow? (type Y or N)","Do you trust them? Why or why not?", "Do you beleive you have a moral obligation to obey them? (type Y or N)",
                   ]
    answer_list=[]

    counter=0
    deity_answer="none"
    anything_answer="none"
    trick_answer="none"
    contradiction=False
    for i in question_list:
        if i=="Do you trust them? Why or why not?" and deity_answer=="N":
            x = "NA"
        elif i=="Do you beleive you have a moral obligation to obey them? (type Y or N)" and deity_answer=="N":
            x = "NA"
        elif i=="Even hurt the person you care for most? (type Y or N)" and anything_answer=="N":
            x = "NA"
        else:
            
            print(i)
            x = input()
            print('')
        answer_list.append(str(x))
        if counter==0:
            print("Hello, " + x)
        elif i=="Is there a deity who you follow? (type Y or N)":
            deity_answer=str(x)
        elif i=="Are you willing to do anything to succeed on your quest? (type Y or N)":
            anything_answer=str(x)
        elif i=="Even hurt the person you care for most? (type Y or N)" and anything_answer=="Y":
            trick_answer=str(x)
            if x=="N":
                print("Hmmmm your answers are contradictory, you seem unsure of where you stand...")
                contradiction=True
        elif i=="Do you beleive you have a moral obligation to obey them? (type Y or N)":
            if deity_answer=="Y":
                if x=="Y" and (contradiction or anything_answer=="N"):
                    newquestion="If you beleive you should follow your deity but aren't willing to do anything for them in this quest then what good are you as a follower?"
                    print(newquestion)
                    newanswer = input()
                elif x=="Y":
                    newquestion="What if your deity told you to hurt the person you cared for most?"
                    print(newquestion)
                    newanswer = input()
                elif x=="N":
                    print("What good are you as a follower then?")
                    if contradiction or anything_answer=="N":
                        newquestion="If you aren't willing to do anything for your goals, and aren't willing to follow your diety, then what do you even stand for?"
                        print(newquestion)
                        newanswer = input()
                    else:
                        newquestion="""Hmmm seems like you are willing to do anything for your quest, but you aren't willing to do anything for your deity. Doesn't that imply that you think you know better than them?Doesn't that mean you are more confident in your own judgement than the judgement of a cosmic being you supposedly follow?"""
                        print(newquestion)
                        newanswer = input()
                        
                question_list.append(newquestion)
                answer_list.append(str(newanswer))
                break
            elif i=="Do you beleive you have a moral obligation to obey them? (type Y or N)" and deity_answer=="N" and (contradiction or anything_answer=="N"):
                newquestion="If you aren't willing to do anything for your goals, and aren't commited to following a deity, then what do you even stand for?"
                print(newquestion)
                newanswer = input()
                question_list.append(newquestion)
                answer_list.append(str(newanswer))
                break
            elif i=="Do you beleive you have a moral obligation to obey them? (type Y or N)" and deity_answer=="N" and anything_answer=="Y":
                newquestion="As a mere mortal, where do you get off having such strong convictions?"
                print(newquestion)
                newanswer = input()
                question_list.append(newquestion)
                answer_list.append(str(newanswer))
                break
        counter=counter+1
        
        time.sleep(2)
        



    print('')
    newquestion="Care to revise any of your answers having thought about it more?"
    print(newquestion)
    newanswer = input()

    question_list.append(newquestion)
    answer_list.append(str(newanswer))

    print('')
    print('Interesting...')
    time.sleep(2)
    final_dict={"Questions":question_list,"Answers":answer_list}
    output_frame=pd.DataFrame.from_dict(final_dict)
    filename=answer_list[0]+"_memory_monk_test.csv"
    output_frame.to_csv(filename,index=False)

    print("The blackness fades and you can see the room again. This portion of the test is finished.")
    dfjkadsjfl=input()

    #print("Please wait for July to tell you what to do next")

#x = input()
#if x="cheese":




"""If we tasked you with melting the entire glacier with a candle, would you:
Prey to your deity for asistance or guidance,
Give up and leave,
Battle the nearest monk for giving you a stupid task,
Or use magic to try to fool the test giver into thinking that the task has been completed"""
