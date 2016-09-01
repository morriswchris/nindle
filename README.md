# Nindle
> Send News to your Kindle

Nindle allows you to simplify (and even automate) the sending all of
your news feeds to your kindle! This is done through a free program
called [Calibre](https://calibre-ebook.com/download). Nindle uses the
calibre recipes and binaries to convert your news feeds to a .modi file,
and optionally sends the file to your kindle through the calibre smpt
service.

## Starting Out

To get started, simply install the nindle library through: `npm install
-g nindle`

Once installed, run the interactive setup to configure your nindle
settings: `nindle init`. Nindle will ask you a series of configuration
questions, including:

1. The calibre profile for conversion. By default this is kindle
2. The output directory for where your .mobi file will be saved
3. The path to where your calibre recipes should be save. We will use
   this path to download new recipes as well as when you run a recipe
4. The kindle email address you can recieve book emails to

The remaining questions revolve around the SMPT settings for mail delivery. GMX is the best option for this. See [Calibre GMX](https://manual.calibre-ebook.com/faq.html#i-cannot-send-emails-using-calibre) for setup instructions.

## Adding Recipes

There are currently two ways to add recipes to nindle. You can manually
add any recipe file to your recipes file (set during nindle init), or
through `nindle add recipe`. For this command, you must specify an
existing recipe found on the calibre repo
[here](https://github.com/kovidgoyal/calibre/tree/master/recipes).

## Generating News through Nindle

To generate your news .mobi file, you will need to have setup some
recipes. Once that is complete, you can easily generate your news file
by running `nindle <recipe name>`. The recipe name will pull the
appropriate recipe file from the folder specified during nindle init. If
you have configured the SMPT settings, at this time nindle will email
you the news .mobi file.

## Bonus: Automation

Currently there are future plans to implement a cron tab generator but
for now if you require automation, you can manually schedule the nindle
command per recipe in your cron tab by editing `crontab -e`!




