'use client';

import { TutorialClass } from '@/app/class_templates/templates';
import { linkClasses } from '@/app/utils/format';
import Image from 'next/image';
import Link from 'next/link';

const baseImgSrc = '/documentation/import-export/';

function downloadJSON() {
  const jsonStr = JSON.stringify(TutorialClass);
  const filename = `TutorialClass.json`;
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function Page() {
  return (
    <div className="documentation-page">
      <section>
        <h1 className="font-title">Importing and Exporting</h1>
        <p>
          One of the features the grade calculator provides is importing and exporting classes. This
          feature has a number of uses. This could allow users to export a class they created
          allowing them to save a class they created using guest class, which does not save
          automatically. With an exported class you can import it into the grade calculator and
          GradeMaster will parse the JSON and update the current class to match the imported class.
        </p>
        <p>
          Another use is if you want to share a class with another person. Once you export a class,
          you can either send them the JSON file or the contents of the class. After which, they can
          open GradeMaster and import the class they received.
        </p>
        <p>
          On the roadmap for GradeMaster is the ability to upload your exported classes into
          templates, which will then be stored on GradeMaster&apos;s servers. Users can then search
          through templates and see if the class they are in has already been added. For more
          information on templates, <Link href="/documentation/templates">Click Here</Link>
        </p>
      </section>
      <section>
        <h2>Exporting Classes</h2>
        <div className="divider" />
        <p>
          Lets learn how we can export classes we&apos;ve created. We will learn this first, because
          you need to have valid JSON to import a class and using the export feature is the easiest
          way to get valid JSON for that. I will use the class that we created in the{' '}
          <Link href="/documentation/setup-basic-class">Setup Basic Class</Link> tutorial, with the
          scores changed a bit to make it more realistic.
        </p>
        <Image
          src={`${baseImgSrc}export-class-start.png`}
          alt="Starting Class"
          height={1000}
          width={1000}
          className="border-2 border-black my-4 rounded-xl"
        />
        <p>
          Now we can click the &apos;Import/Export&apos; button and click the toggle to switch to
          exporting mode. From here you can click the download JSON button which will download a
          JSON file with the class information in it, or you can copy the class json that was
          provided.
        </p>
        <Image
          src={`${baseImgSrc}export-results.png`}
          alt="Export Results"
          height={500}
          width={500}
          className="border-2 border-black my-4 rounded-xl"
        />
        <p>
          Now you have successfully exported a class from GradeMaster. As long as you have this
          exported class, you, or anyone you give it to, will be able to replicate the class by
          importing it.
        </p>
      </section>
      <section>
        <h2>Importing Classes</h2>
        <div className="divider" />
        <p>
          Once you have a Class JSON that was either provided to you or you got from exporting a
          class, you can now import a class to GradeMaster. For this example we will be importing
          the class we just exported into a blank guest class. To start, let&apos;s open up a blank
          guest page. You can do so by navigating to <Link href="/guest">Guest Page</Link> or if you
          are already on the guest page, but refreshing the page. This is our blank guest page.
        </p>
        <Image
          src={`/documentation/setup-basic-class/base-class.png`}
          alt="Fresh Guest Class"
          height={1000}
          width={1000}
          className="border-2 border-black my-4 rounded-xl"
        />
        <p>
          Now we can click the &apos;Import/Export&apos; button. Here you can see an input field for
          the Class JSON. I will use the class JSON I got from exporting the class above.{' '}
          <span className={`${linkClasses} cursor-pointer`} onClick={() => downloadJSON()}>
            Click Here
          </span>{' '}
          to download the JSON file I will be using. Go ahead and paste the entire JSON into the
          field and click Import.
        </p>
        <Image
          src={`${baseImgSrc}import-input.png`}
          alt="Import Input"
          height={500}
          width={500}
          className="border-2 border-black my-4 rounded-xl"
        />
        <p>
          Once you click Import, it will process your JSON and then show you a preview of the class
          that will be created. If you input an invalid JSON, it will show you an error letting you
          know, although it likely will not tell you why it&apos;s invalid.
        </p>
        <Image
          src={`${baseImgSrc}import-preview.png`}
          alt="Import Preview"
          height={500}
          width={500}
          className="border-2 border-black my-4 rounded-xl"
        />
        <p>
          Once you confirm everything is correct, simply click next and the grade calculator should
          be updated with your imported class.{' '}
          <b>
            Be careful though, as this will completely overwrite your entire class, so any data you
            had in the class before will be lost and irretrievable.
          </b>
        </p>
        <Image
          src={`${baseImgSrc}import-result.png`}
          alt="Imported Class"
          height={1000}
          width={1000}
          className="border-2 border-black my-4 rounded-xl"
        />
        <p>
          With that you have succesfully imported your class and can now edit it any way you want!
        </p>
      </section>
      <section>
        <h2>FAQs</h2>
        <div className="divider" />
        <p>Adding soon</p>
      </section>
    </div>
  );
}
