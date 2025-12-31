Welcome to the Eliza OS developer
YouTube channel. This is the second
video in our foundational series called
your first agent. Now today we are going
to get our first agent up and running.
If you didn't watch the first video that
was about CLI and monor repo usage
patterns. Very important to understand
these. Not super complicated, but very
important to understand. If you type
this and you're not seeing that, then
head over to eliza.how and follow the
installation and quick start. Get your
CLI installed and yeah, we can start.
So, as I explained in the first video,
if you're trying to create your own
project, your own agent, your own
plugin, something like that, the CLI is
going to be the way to go. We don't need
to install the whole mono repo. And if
we want to create a project or a plugin
or an agent, looks like the create
command is the way to go. So let's run
this command
with a help flag and see how it works.
Okay. Create a new Eliz OS project
plugin agent or T. It takes a name of
the project or whatever plugin agent as
the argument. you can skip with the
flag. Yes. Or a type you can specify as
a flag. So that sounds good. Um I like
using types. So I will say that it's a
project
and I will call it that. We offer two
very easy database choices. This is for
local and this is for Postgress. Both
are very easy. I'm going to use local.
If you want to use Postgress, you can
use something like Neon and very easily
get a free hosted database that you can
use. And we offer several model choices
here. I'm going to select OpenAI just
for this demo.
So, I'm going to show you
what the project structure looks like.
And I'm going to point your eyes to the
most important stuff first. Basically,
so the src is very important because it
contains the index and the character
file and the plug-in file. These are
super important. Um, basically the
character file is probably the most
important file. Then we have the env.
And this is actually going to show our
env files that we created while we were
setting up our project. So here's my
open AAI key. Here's my location of the
data directory. Oh, cool. So, as I can
see, my database is actually right here
in this. Eliza folder inside of my
project. That's cool. Bunch of node
modules in here. Dis scripts. We don't
really need to worry about that stuff
right now. What's most important is this
character file, this env. Also, this
env.
This is going to show us the keys to the
key value pairs of any of the plugins
that we might want to use. So, this is
really helpful helper text. For example,
if we wanted to use the Twitter plugin,
we know that we would have to copy all
of these over and paste them in and add
the values, right? And yeah, so let's
get down to it. I want to show you guys
the default character, which is of
course Eliza. So we can see here that
there's some conditional logic to import
some plugins. And then we have our
system prompt, a bio, topics,
message examples,
style,
and yeah, basically all of these just
define the character. So when I think
about Eliza, I think about agents which
have a personality, right? So they have
like goals and bio and lore and things
that they want to happen and style. So
they kind of have a personality. And
then they're equipped with plugins. And
those are really the two super important
things that an agent has. It has a
personality and it has plugins. And the
plugins basically allow agents to do
stuff to interact with the world. Um, so
yeah, right now we're just going to run
Eliza as she is. And I'm going to run as
a dev server. So we can see here that
there's two options. There's a dev
server or a start command. So both of
these, they're very similar. They're
basically identical. But the dev server,
when you're testing your agents, you're
going to want to use more because it's
actually going to hot reload. Um, when
you're actually running a development
server, you're going to want to use
start. But we can see here that we're
going to get a lot more verbose logs
with the dev command. Um, and also we're
going to get hot reloading. So, if I
were to change things in here, then
those would be updating in real time.
Now, first let's go to localhost and
let's see. So, we're actually running.
Hi, Eliza. What's up?
And the Eliza server is running. Eliza
is responding as normal. Now, what if we
went in here and we asked
the IDE to change this character file to
a character
named
Limbo who is very strange and wacky and
respect the whole character file
structure just replacing
strings.
Yeah, basically we've changed the name.
Okay, it's making like a wizard with
rubber ducks. Okay, it's obsessed with
rubber ducks basically. So,
yeah. So, I just changed that file. Now,
I would expect the server to have
responded because we're running dev. So,
see here, we already see some stuff that
shows it's changed. Um, if we were
running start, we would have to stop the
server and start it again. So,
yeah, here's Jimbo. And we can see here
our system prompt is updated.
Jumbo
going.
If we want to change
the picture, we can.
And yeah, now we have a kind of wacky
character that's saying weird stuff. So,
just in a couple minutes, we were able
to get this character. Very unique
personality, much different than
Eliza's. It's very easy to just prompt
cursor and play with this.
So, that's it for the video today. In
the next video, video three, we're going
to talk about adding multiple
characters, and we're also going to talk
about adding and removing plugins, which
is super important. Thanks, guys.