﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

//Added this
using Homework_5.DAL;
using Homework_5.Models;

namespace Homework_5.Controllers
{
    public class RequestsController : Controller
    {

        private RequestContext database = new RequestContext();

        [HttpGet]
        public ActionResult Index()
        {
            ViewBag.Message = "Your home page.";

            return View();
        }

        // GET: Requests
        //public ActionResult Index()
        [HttpGet]
        public ActionResult Listing()
        {
            return View(database.Requests.ToList());
        }

        //GET: Requests/Create
        [HttpGet]
        public ActionResult Create()
        {
            return View();
        }

        // POST: Requests/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "FirstName, LastName, PhoneNumber, ApartmentName, UnitNumber, RequestExplanation, Permission, DateTimeOfRequest")] Request request)
        {
            if (ModelState.IsValid)
            {
                request.DateTimeOfRequest = DateTime.Now;
                database.Requests.Add(request);
                database.SaveChanges();
                return RedirectToAction("Listing");
            }

            return View(request);
        }





        /*
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        */

    }
}