﻿using FakeItEasy;
using NUnit.Framework;
using Omu.ProDinner.Core;
using Omu.ProDinner.Core.Model;
using Omu.ProDinner.Core.Service;
using Omu.ProDinner.WebUI.Mappers;
using Omu.ProDinner.WebUI.Controllers;
using Omu.ProDinner.WebUI.Dto;

namespace Omu.ProDinner.Tests
{
    public class CruderControllerTests
    {
        CountryController c;

        [Fake]
        IMapper<Country, CountryInput> v;
        [Fake]
        ICrudService<Country> s;

        [SetUp]
        public void SetUp()
        {
            Fake.InitializeFixture(this);
            c = new CountryController(s, v);
        }

        [Test]
        public void IndexShouldReturnViewCruds()
        {
            c.Index().ShouldBeViewResult().ViewName.ShouldEqual("cruds");
        }

        [Test]
        public void CreateShouldBuildNewInput()
        {
            c.Create();
            A.CallTo(() => v.MapToInput(A<Country>.Ignored)).MustHaveHappened();
        }

        [Test]
        public void CreateShouldReturnViewForInvalidModelstate()
        {
            c.ModelState.AddModelError("", "");
            c.Create(A.Fake<CountryInput>()).ShouldBeViewResult();
        }

        [Test]
        public void CreateShouldReturnJson()
        {
            c.Create(A.Fake<CountryInput>()).ShouldBeJson();
        }

        [Test]
        public void EditShouldReturnCreateView()
        {
            A.CallTo(() => s.Get(1)).Returns(A.Fake<Country>());
            c.Edit(1).ShouldBeViewResult().ShouldBeCreate();
            A.CallTo(() => s.Get(1)).MustHaveHappened();
        }

        [Test]
        public void EditShouldThrowException()
        {
            A.CallTo(() => s.Get(1)).Returns(null);
            Assert.Throws<ProDinnerException>(() => c.Edit(1));
            A.CallTo(() => v.MapToInput(A<Country>.Ignored)).MustNotHaveHappened();
        }

        [Test]
        public void EditShouldReturnJson()
        {
            c.Edit(A.Fake<CountryInput>()).ShouldBeJson();
            A.CallTo(() => v.MapToEntity(A<CountryInput>.Ignored, A<Country>.Ignored)).MustHaveHappened();
            A.CallTo(() => s.Get(A<int>.Ignored)).MustHaveHappened();
            A.CallTo(() => s.Save()).MustHaveHappened();
        }

        [Test]
        public void EditShouldReturnViewForInvalidModelstate()
        {
            c.ModelState.AddModelError("", "");
            c.Edit(A.Fake<CountryInput>()).ShouldBeViewResult().ShouldBeCreate();
        }

        [Test]
        public void EditShouldReturnContentOnError()
        {
            A.CallTo(() => v.MapToEntity(A<CountryInput>.Ignored, A<Country>.Ignored)).Throws(new ProDinnerException("aa"));
            c.Edit(A.Fake<CountryInput>()).ShouldBeContent().Content.ShouldEqual("aa");
        }

        [Test]
        public void DeleteShouldRedirectToIndex()
        {
            c.Delete(1).ShouldBeJson();
            A.CallTo(() => s.Delete(1)).MustHaveHappened();
        }
    }
}
